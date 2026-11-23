import { NextResponse } from 'next/server';
import {
  getAllOrders,
  createOrder,
  updateOrderStatus,
  ALLOWED_ORDER_STATUSES,
  OrderStatus,
  OrderItem,
} from '@/lib/orderStorage';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

function verifyAdminAuth(req: Request): boolean {
  const adminApiKey = process.env.ADMIN_API_KEY;
  if (!adminApiKey || adminApiKey.trim() === '') {
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
    .map(
      (i: any) =>
        `• ${escapeHtml(i.title)} (${escapeHtml(i.variantTitle || '')}) x${i.quantity} — ${i.price * i.quantity} ${escapeHtml(order.currency || 'UAH')}`
    )
    .join('\n');

  const text =
    `🛍 <b>НОВЕ ЗАМОВЛЕННЯ #${escapeHtml(order.id)}</b>\n\n` +
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
  const ip = getClientIp(req);
  const rl = checkRateLimit(`admin-auth:${ip}`, 25, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: `Забагато спроб запиту. Спробуйте через ${rl.resetInSec} сек.` },
      { status: 429, headers: { 'Retry-After': String(rl.resetInSec) } }
    );
  }

  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Відсутній або недійсний заголовок x-admin-key' },
      { status: 401 }
    );
  }

  try {
    const orders = await getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Не вдалося прочитати список замовлень' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`orders:${ip}`, 10, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: `Забагато запитів на оформлення. Зачекайте ${rl.resetInSec} сек.` },
      { status: 429, headers: { 'Retry-After': String(rl.resetInSec) } }
    );
  }

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
    const phoneRegex = /^[\d\s+\-()]{8,25}$/;
    if (typeof rawPhone !== 'string' || !phoneRegex.test(rawPhone.trim())) {
      return NextResponse.json(
        { success: false, error: "Некоректний формат телефону 'phone'" },
        { status: 400 }
      );
    }

    // 3. Validate items
    const rawItems = body.items;
    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "Поле 'items' має бути непорожнім масивом" },
        { status: 400 }
      );
    }

    const validatedItems: OrderItem[] = [];
    for (const item of rawItems) {
      if (!item || typeof item !== 'object') {
        return NextResponse.json(
          { success: false, error: 'Кожен елемент у items має бути валідним об’єктом' },
          { status: 400 }
        );
      }
      if (typeof item.title !== 'string' || item.title.trim() === '') {
        return NextResponse.json(
          { success: false, error: "Кожен товар повинен містити непорожню назву 'title'" },
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

    const newOrder = await createOrder({
      customer: {
        name: rawName.trim(),
        phone: rawPhone.trim(),
        city: typeof body.city === 'string' ? body.city.trim().slice(0, 100) : '',
        messenger: typeof body.messenger === 'string' ? body.messenger.trim().slice(0, 50) : 'Дзвінок',
      },
      items: validatedItems,
      total: Math.round(calculatedTotal * 100) / 100,
      currency: typeof body.currency === 'string' ? body.currency.slice(0, 5) : 'UAH',
      status: 'new',
      paymentMethod: body.paymentMethod === 'online' ? 'online' : 'cod',
    });

    // Send telegram notification asynchronously
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

    if (!ALLOWED_ORDER_STATUSES.includes(status as OrderStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Неприпустимий статус. Дозволені статуси: ${ALLOWED_ORDER_STATUSES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(orderId, status as OrderStatus);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Замовлення не знайдено' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    console.error('Failed updating order status:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Помилка оновлення статусу' },
      { status: 500 }
    );
  }
}
