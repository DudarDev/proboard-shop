import fs from 'fs';
import path from 'path';
import os from 'os';

export const ALLOWED_ORDER_STATUSES = [
  'new',
  'processing',
  'shipped',
  'delivered',
  'completed',
  'cancelled',
] as const;

export type OrderStatus = (typeof ALLOWED_ORDER_STATUSES)[number];

export interface OrderCustomer {
  name: string;
  phone: string;
  city?: string;
  messenger?: string;
}

export interface OrderItem {
  id: string;
  title: string;
  variantTitle?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: 'online' | 'cod';
}

// In-memory cache & fallback store (e.g. for strict read-only serverless runtimes)
let memoryOrdersStore: Order[] | null = null;
let writeQueue = Promise.resolve();

// Primary path: project data directory
const PRIMARY_PATH = path.join(process.cwd(), 'src', 'data', 'orders.json');
// Fallback path: OS temp directory (writable on Vercel /tmp)
const TMP_PATH = path.join(os.tmpdir(), 'proboard-orders.json');

let resolvedStoragePath: string | null = null;
let isReadOnlyMode = false;

/**
 * Determines the best writable storage path.
 * If src/data/orders.json is read-only (e.g. Vercel deployment), falls back to os.tmpdir()
 */
async function getStoragePath(): Promise<string> {
  if (resolvedStoragePath) return resolvedStoragePath;

  try {
    const dir = path.dirname(PRIMARY_PATH);
    await fs.promises.mkdir(dir, { recursive: true });
    // Test write permission with an ephemeral test file
    const testFile = path.join(dir, `.test-write-${Date.now()}`);
    await fs.promises.writeFile(testFile, 'ok', 'utf8');
    await fs.promises.unlink(testFile);

    resolvedStoragePath = PRIMARY_PATH;
    return PRIMARY_PATH;
  } catch (err: any) {
    console.warn(
      `[OrderStorage] Primary location (${PRIMARY_PATH}) is read-only or inaccessible (${err.code || err.message}). Switching to /tmp storage.`
    );
    try {
      const tmpDir = path.dirname(TMP_PATH);
      await fs.promises.mkdir(tmpDir, { recursive: true });
      resolvedStoragePath = TMP_PATH;
      return TMP_PATH;
    } catch (tmpErr: any) {
      console.warn(
        `[OrderStorage] /tmp is also inaccessible (${tmpErr.code || tmpErr.message}). Switching to in-memory fallback store.`
      );
      isReadOnlyMode = true;
      resolvedStoragePath = 'memory';
      return 'memory';
    }
  }
}

/**
 * Reads initial seed orders from repository json if available
 */
async function getSeedOrders(): Promise<Order[]> {
  try {
    if (fs.existsSync(PRIMARY_PATH)) {
      const content = await fs.promises.readFile(PRIMARY_PATH, 'utf8');
      return JSON.parse(content || '[]');
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * Returns all stored orders
 */
export async function getAllOrders(): Promise<Order[]> {
  if (isReadOnlyMode && memoryOrdersStore !== null) {
    return [...memoryOrdersStore];
  }

  const storagePath = await getStoragePath();

  if (storagePath === 'memory') {
    if (memoryOrdersStore === null) {
      memoryOrdersStore = await getSeedOrders();
    }
    return [...memoryOrdersStore];
  }

  try {
    if (!fs.existsSync(storagePath)) {
      const seed = await getSeedOrders();
      await fs.promises.writeFile(storagePath, JSON.stringify(seed, null, 2), 'utf8');
      memoryOrdersStore = seed;
      return [...seed];
    }

    const content = await fs.promises.readFile(storagePath, 'utf8');
    const parsed = JSON.parse(content || '[]');
    memoryOrdersStore = parsed;
    return parsed;
  } catch (err) {
    console.error('[OrderStorage] Failed reading orders from storage:', err);
    if (memoryOrdersStore !== null) {
      return [...memoryOrdersStore];
    }
    return await getSeedOrders();
  }
}

/**
 * Saves orders atomically with sequential queue
 */
async function atomicSave(orders: Order[]): Promise<void> {
  memoryOrdersStore = orders;

  const storagePath = await getStoragePath();
  if (storagePath === 'memory') {
    return;
  }

  try {
    const dir = path.dirname(storagePath);
    await fs.promises.mkdir(dir, { recursive: true });
    const tempFile = `${storagePath}.${Date.now()}.${Math.random().toString(36).substring(2)}.tmp`;
    await fs.promises.writeFile(tempFile, JSON.stringify(orders, null, 2), 'utf8');
    await fs.promises.rename(tempFile, storagePath);
  } catch (err: any) {
    console.warn(`[OrderStorage] Write failed on ${storagePath}: ${err.message}. Preserving in-memory state.`);
    // Fallback to memory mode
    isReadOnlyMode = true;
    resolvedStoragePath = 'memory';
  }
}

/**
 * Sequential atomic save helper
 */
function enqueueSave(orders: Order[]): Promise<void> {
  writeQueue = writeQueue.then(() => atomicSave(orders));
  return writeQueue;
}

/**
 * Creates and persists a new order
 */
export async function createOrder(
  data: Omit<Order, 'id' | 'createdAt'>
): Promise<Order> {
  const currentOrders = await getAllOrders();

  const newOrder: Order = {
    ...data,
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
  };

  currentOrders.unshift(newOrder);
  await enqueueSave(currentOrders);

  return newOrder;
}

/**
 * Updates status of an existing order
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<Order | null> {
  const currentOrders = await getAllOrders();
  const index = currentOrders.findIndex((o) => o.id === orderId);

  if (index === -1) {
    return null;
  }

  currentOrders[index].status = status;
  await enqueueSave(currentOrders);

  return currentOrders[index];
}
