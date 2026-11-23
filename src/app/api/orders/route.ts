import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

const ALLOWED_STATUSES = ['new', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'] as const;
type OrderStatus = typeof ALLOWED_STATUSES[number];

// Simple in-memory mutex/write queue to guarantee atomic sequential writes
let writeQueue = Promise.resolve();

async function atomicSaveOrders(orders: any[]): Promise<void> {
  const dir = path.dirname(dataFilePath);
  await fs.promises.mkdir(dir, { recursive: true });
  const tempPath = `${dataFilePath}.${Date.now()}.${Math.random().toString(36).substring(2)}.tmp`;
  await fs.promises.writeFile(tempPath, JSON.stringify(orders, null, 2), 'utf8');
  await fs.promises.rename(tempPath, dataFilePath);
}

function saveOrders(orders: any[]): Promise<void> {
  writeQueue = writeQueue.then(() => atomicSaveOrders(orders));
  return writeQueue;
}

async function getOrders(): Promise<any[]> {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const content = await fs.promises.readFile(dataFilePath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading orders.json:', err);
    return [];
  }
}

function verifyAdminAuth(req: Request): boolean {
  const adminApiKey = process.env.ADMIN_API_KEY;
  if (!adminApiKey || adminApiKey.trim() === '') {
    // If ADMIN_API_KEY is not configured on server, disallow access
    return false;
  }
  const clientKey = req.headers.get('x-admin-key');
  return clientKey === adminApiKey;
}

function escapeHtml(str: unknown): string {
  if (typeof str !== 'string') {
    return String(str ?? '');
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendTelegramNotification(order: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  const itemsList = order.items
    .map((i: any) => `• ${escapeHtml(i.title)} (${escapeHtml(i.variantTitle || '')}) x${i.quantity} — ${i.price * i.quantity} ${escapeHtml(order.currency || 'UAH')}`)
    .join('\n');

  const text = `🛍 <b>НОВЕ ЗАМОВЛЕННЯ #${escapeHtml(order.id)}</b>\n\n` +
    `👤 <b>Клієнт:</b> ${escapeHtml(order.customer.name)}\n` +
    `📞 <b>Телефон:</b> ${escapeHtml(order.customer.phone)}\n` +
    `📍 <b>Доставка:</b> ${escapeHtml(order.customer.city || 'Не вказано')}\n` +
    `💬 <b>Зв'язок:</b> ${escapeHtml(order.customer.messenger || 'Дзвінок')}\n\n` +
    `📦 <b>Товари:</b>\n${itemsList}\n\n` +
    `💰 <b>Разом:</b> ${order.total} ${escapeHtml(order.currency || 'UAH')} (${order.paymentMethod === 'cod' ? 'Оплата при отриманні' : 'Онлайн'})`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });
  } catch (err) {
    console.warn('Failed to send Telegram message:', err);
  }
}

export async function GET(req: Request) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Відсутній або недійсний заголовок x-admin-key' },
      { status: 401 }
    );
  }

  try {
    const orders = await getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Не вдалося прочитати список замовлень' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate customer name
    const rawName = body.name;
    if (typeof rawName !== 'string' || rawName.trim().length < 2 || rawName.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Поле 'name' є обов'язковим (від 2 до 100 символів)" },
        { status: 400 }
      );
    }

    // 2. Validate phone number
    const rawPhone = body.phone;
    const phoneRegex = /^\+?[0-9\s\-()]{8,25}$/;
    if (typeof rawPhone !== 'string' || !phoneRegex.test(rawPhone.trim())) {
      return NextResponse.json(
        { success: false, error: "Поле 'phone' повинно містити коректний номер телефону (від 8 цифр)" },
        { status: 400 }
      );
    }

    // 3. Validate items array
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Поле 'items' повинно містити хоча б один товар" },
        { status: 400 }
      );
    }

    const validatedItems = [];
    for (const item of body.items) {
      if (!item || typeof item !== 'object') {
        return NextResponse.json(
          { success: false, error: 'Невірний формат елемента товару' },
          { status: 400 }
        );
      }
      if (typeof item.title !== 'string' || item.title.trim() === '') {
        return NextResponse.json(
          { success: false, error: "Кожен товар повинен містити непусту назву 'title'" },
          { status: 400 }
        );
      }
      const qty = Number(item.quantity);
      if (!Number.isInteger(qty) || qty <= 0 || qty > 99) {
        return NextResponse.json(
          { success: false, error: "Кількість товару 'quantity' має бути цілим числом від 1 до 99" },
          { status: 400 }
        );
      }
      const price = Number(item.price);
      if (isNaN(price) || price < 0) {
        return NextResponse.json(
          { success: false, error: "Ціна товару 'price' має бути невід'ємним числом" },
          { status: 400 }
        );
      }

      validatedItems.push({
        id: typeof item.id === 'string' ? item.id : '',
        title: item.title.trim().slice(0, 150),
        variantTitle: typeof item.variantTitle === 'string' ? item.variantTitle.slice(0, 50) : '',
        price,
        quantity: qty,
        image: typeof item.image === 'string' ? item.image : '',
      });
    }

    // 4. Recalculate total on server (ignore untrusted client total)
    const calculatedTotal = validatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orders = await getOrders();

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      customer: {
        name: rawName.trim(),
        phone: rawPhone.trim(),
        city: typeof body.city === 'string' ? body.city.trim().slice(0, 100) : '',
        messenger: typeof body.messenger === 'string' ? body.messenger.trim().slice(0, 50) : 'Дзвінок',
      },
      items: validatedItems,
      total: Math.round(calculatedTotal * 100) / 100,
      currency: typeof body.currency === 'string' ? body.currency.slice(0, 5) : 'UAH',
      status: 'new' as OrderStatus,
      paymentMethod: body.paymentMethod === 'online' ? 'online' : 'cod',
    };

    orders.unshift(newOrder);

    // 5. Persist with atomic write queue and propagate errors
    await saveOrders(orders);

    // Send telegram notification asynchronously (safe, sanitized)
    sendTelegramNotification(newOrder).catch((e) => console.warn(e));

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    console.error('Failed saving order:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Помилка збереження замовлення' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Відсутній або недійсний заголовок x-admin-key' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json(
        { success: false, error: "Поле 'orderId' є обов'язковим" },
        { status: 400 }
      );
    }

    // Validate status against whitelist
    if (!ALLOWED_STATUSES.includes(status as OrderStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Неприпустимий статус. Дозволені статуси: ${ALLOWED_STATUSES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const orders = await getOrders();
    const orderIndex = orders.findIndex((o: any) => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Замовлення не знайдено' },
        { status: 404 }
      );
    }

    orders[orderIndex].status = status;
    await saveOrders(orders);

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch (err: any) {
    console.error('Failed updating order status:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Помилка оновлення статусу' },
      { status: 500 }
    );
  }
}
