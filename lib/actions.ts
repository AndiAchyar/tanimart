"use client";

import {
  KEYS,
  getCart,
  getOrders,
  getProducts,
  getUsers,
  hashPassword,
  remove,
  save,
} from "./store";
import type {
  DeliveryStatus,
  Order,
  PaymentMode,
  Product,
  Role,
  Session,
} from "./types";

type Result = { ok: true } | { ok: false; error: string };
const fail = (error: string) => ({ ok: false as const, error });

// ---------- Auth ----------

export async function register(
  username: string,
  email: string,
  password: string,
  confirm: string,
): Promise<Result> {
  if (password !== confirm) return fail("Kata sandi tidak sama.");
  const mail = email.trim().toLowerCase();
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === mail)) {
    return fail("Email sudah terdaftar.");
  }
  const id = users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
  const passwordHash = await hashPassword(password);
  const saved = save(KEYS.users, [
    ...users,
    { id, username: username.trim(), email: mail, passwordHash },
  ]);
  return saved ? { ok: true } : fail("Pendaftaran gagal disimpan. Coba lagi.");
}

export async function login(
  email: string,
  password: string,
  role: Role,
): Promise<Result> {
  const mail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);
  const user = getUsers().find(
    (u) => u.email.toLowerCase() === mail && u.passwordHash === passwordHash,
  );
  if (!user) return fail("Email atau kata sandi salah.");
  const session: Session = { username: user.username, email: user.email, role };
  save(KEYS.session, session);
  return { ok: true };
}

export function logout() {
  remove(KEYS.session);
}

// ---------- Keranjang ----------

export function addToCart(product: Product, qty: number): Result {
  const cart = getCart();
  if (cart.some((i) => i.productId === product.id)) {
    return fail("Item sudah ada di keranjang Anda!");
  }
  if (!Number.isInteger(qty) || qty < 1) return fail("Jumlah minimal 1.");
  if (qty > product.stock) return fail(`Stok ${product.name} hanya ${product.stock}.`);
  save(KEYS.cart, [
    ...cart,
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      code: product.code,
      qty,
    },
  ]);
  return { ok: true };
}

export function setCartQty(productId: number, qty: number) {
  if (!Number.isInteger(qty) || qty < 1) return;
  const stock = getProducts().find((p) => p.id === productId)?.stock ?? qty;
  const next = Math.min(qty, stock);
  save(
    KEYS.cart,
    getCart().map((i) => (i.productId === productId ? { ...i, qty: next } : i)),
  );
}

export function removeFromCart(productId: number) {
  save(
    KEYS.cart,
    getCart().filter((i) => i.productId !== productId),
  );
}

export function clearCart() {
  save(KEYS.cart, []);
}

// ---------- Pesanan ----------

export type OrderInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
  payment: PaymentMode;
};

export function placeOrder(
  input: OrderInput,
): { ok: true; order: Order } | { ok: false; error: string } {
  const cart = getCart();
  if (cart.length === 0) return fail("Keranjang masih kosong.");

  const products = getProducts();
  for (const item of cart) {
    const stock = products.find((p) => p.id === item.productId)?.stock ?? 0;
    if (item.qty > stock) {
      return fail(`Stok ${item.name} tidak cukup (tersisa ${stock}).`);
    }
  }

  const orders = getOrders();
  const order: Order = {
    ...input,
    id: orders.reduce((max, o) => Math.max(max, o.id), 0) + 1,
    items: cart.map((i) => ({ name: i.name, qty: i.qty })),
    total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const stockLeft = products.map((p) => {
    const bought = cart.find((i) => i.productId === p.id);
    return bought ? { ...p, stock: p.stock - bought.qty } : p;
  });

  if (!save(KEYS.orders, [...orders, order])) {
    return fail("Pesanan gagal disimpan. Coba lagi.");
  }
  save(KEYS.products, stockLeft);
  save(KEYS.cart, []);
  return { ok: true, order };
}

const NEXT_STATUS: Record<string, DeliveryStatus> = {
  pending: "in_delivery",
  in_delivery: "delivered",
};

export function advanceOrder(orderId: number) {
  save(
    KEYS.orders,
    getOrders().map((o) =>
      o.id === orderId && NEXT_STATUS[o.status]
        ? { ...o, status: NEXT_STATUS[o.status] }
        : o,
    ),
  );
}

// ---------- Produk (petani) ----------

export function addStock(productId: number, amount: number): Result {
  if (!Number.isInteger(amount) || amount < 1) {
    return fail("Jumlah stok tambahan harus bilangan bulat minimal 1.");
  }
  save(
    KEYS.products,
    getProducts().map((p) =>
      p.id === productId ? { ...p, stock: p.stock + amount } : p,
    ),
  );
  return { ok: true };
}

export function deleteProduct(productId: number) {
  save(
    KEYS.products,
    getProducts().filter((p) => p.id !== productId),
  );
  // Buang juga dari keranjang agar tidak menyisakan produk yang sudah tidak ada.
  save(
    KEYS.cart,
    getCart().filter((i) => i.productId !== productId),
  );
}

export function addProduct(input: {
  name: string;
  price: number;
  stock: number;
  image: string;
}): Result {
  const products = getProducts();
  const id = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const code = "PRD" + Math.random().toString(36).slice(2, 7).toUpperCase();
  const saved = save(KEYS.products, [{ id, code, ...input }, ...products]);
  return saved
    ? { ok: true }
    : fail("Penyimpanan browser penuh. Coba gambar yang lebih kecil.");
}

/** Perkecil gambar unggahan agar muat di localStorage. */
export function imageToDataUrl(file: File, maxSide = 720): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas tidak tersedia"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gambar tidak dapat dibaca"));
    };
    img.src = url;
  });
}
