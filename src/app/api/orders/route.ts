import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

function getOrders() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const content = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading orders.json:', err);
    return [];
  }
}

function saveOrders(orders: any[]) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(orders, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing orders.json:', err);
  }
}

async function sendTelegramNotification(order: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  const itemsList = order.items
    .map((i: any) => `• ${i.title} (${i.variantTitle}) x${i.quantity} — $${i.price * i.quantity}`)
    .join('\n');

  const text = `🛍 <b>НОВЕ ЗАМОВЛЕННЯ #${order.id}</b>\n\n` +
    `👤 <b>Клієнт:</b> ${order.customer.name}\n` +
    `📞 <b>Телефон:</b> ${order.customer.phone}\n` +
    `📍 <b>Доставка:</b> ${order.customer.city || 'Не вказано'}\n` +
    `💬 <b>Зв'язок:</b> ${order.customer.messenger || 'Дзвінок'}\n\n` +
    `📦 <b>Товари:</b>\n${itemsList}\n\n` +
    `💰 <b>Разом:</b> $${order.total} (${order.paymentMethod === 'cod' ? 'Оплата при отриманні' : 'Онлайн'})`;

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

export async function GET() {
  const orders = getOrders();
  return NextResponse.json({ success: true, orders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orders = getOrders();

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      customer: {
        name: body.name || 'Анонімний покупець',
        phone: body.phone || '',
        city: body.city || '',
        messenger: body.messenger || 'Дзвінок',
      },
      items: body.items || [],
      total: body.total || 0,
      currency: body.currency || 'USD',
      status: 'new',
      paymentMethod: body.paymentMethod || 'cod',
    };

    orders.unshift(newOrder);
    saveOrders(orders);

    // Try sending telegram notification asynchronously
    sendTelegramNotification(newOrder).catch((e) => console.warn(e));

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();
    const orders = getOrders();

    const orderIndex = orders.findIndex((o: any) => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    orders[orderIndex].status = status;
    saveOrders(orders);

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
