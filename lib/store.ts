"use client";

import { useSyncExternalStore } from "react";
import seedProducts from "@/data/products.json";
import type { CartItem, Order, Product, Session, User } from "./types";

// SHA-256 dari kata sandi "admin" (akun bawaan, sama seperti dump SQL lama).
const ADMIN_HASH =
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

const SEED_PRODUCTS = seedProducts as Product[];
const SEED_USERS: User[] = [
  { id: 9, username: "admin", email: "admin@gmail.com", passwordHash: ADMIN_HASH },
];
const NO_CART: CartItem[] = [];
const NO_ORDERS: Order[] = [];

export const KEYS = {
  products: "tanimart.products",
  users: "tanimart.users",
  cart: "tanimart.cart",
  orders: "tanimart.orders",
  session: "tanimart.session",
} as const;

const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// Snapshot harus stabil (referensi sama) selama isi localStorage tidak berubah.
function snapshot<T>(key: string, fallback: T): T {
  const raw = readRaw(key);
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

/** Simpan ke localStorage. Mengembalikan false bila gagal (mis. kuota penuh). */
export function save<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }
  listeners.forEach((l) => l());
  return true;
}

export function remove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* abaikan */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function useStored<T>(key: string, fallback: T): T {
  return useSyncExternalStore(
    subscribe,
    () => snapshot(key, fallback),
    () => fallback,
  );
}

// Pembaca imperatif (untuk event handler)
export const getProducts = () => snapshot<Product[]>(KEYS.products, SEED_PRODUCTS);
export const getUsers = () => snapshot<User[]>(KEYS.users, SEED_USERS);
export const getCart = () => snapshot<CartItem[]>(KEYS.cart, NO_CART);
export const getOrders = () => snapshot<Order[]>(KEYS.orders, NO_ORDERS);

// Hook reaktif
export const useProducts = () => useStored<Product[]>(KEYS.products, SEED_PRODUCTS);
export const useCart = () => useStored<CartItem[]>(KEYS.cart, NO_CART);
export const useOrders = () => useStored<Order[]>(KEYS.orders, NO_ORDERS);
export const useSession = () => useStored<Session | null>(KEYS.session, null);

/** false saat render server/hidrasi, true di klien; dipakai untuk guard login. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
