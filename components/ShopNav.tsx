"use client";

import { CreditCard, Home, Menu, ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/store";
import { BrandMark } from "./BrandMark";

const links = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/belanja", label: "Produk", icon: Store },
  { href: "/checkout", label: "Pembayaran", icon: CreditCard },
] as const;

export function ShopNav({ active }: { active: "/belanja" | "/keranjang" | "/checkout" }) {
  const [open, setOpen] = useState(false);
  const count = useCart().length;

  const base =
    "flex items-center gap-2 rounded-[10px] px-3.5 py-2 text-[15px] font-semibold transition hover:bg-mist";
  const on = "!bg-forest !text-white";

  return (
    <nav
      aria-label="Navigasi toko"
      className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur"
    >
      <div className="mx-auto flex min-h-[68px] w-[min(1120px,100%-40px)] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[22px] font-extrabold text-forest">
          <BrandMark />
          TaniMart
        </Link>
        <button
          type="button"
          className="grid size-[42px] place-items-center rounded-[10px] border-[1.5px] border-line text-forest md:hidden"
          aria-label="Buka atau tutup menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu size={20} />
        </button>
        <ul
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[68px] flex-col gap-1 border-b border-line bg-paper px-5 pb-4 pt-3 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}
        >
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active === href ? "page" : undefined}
                className={`${base} ${active === href ? on : ""}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/keranjang"
              onClick={() => setOpen(false)}
              aria-current={active === "/keranjang" ? "page" : undefined}
              aria-label={`Keranjang belanja, ${count} item`}
              className={`${base} ${active === "/keranjang" ? on : ""}`}
            >
              <span className="relative">
                <ShoppingCart size={16} />
                {count > 0 && (
                  <span className="absolute -right-3 -top-3 grid min-w-4 place-items-center rounded-full bg-marigold px-1 text-[11px] font-bold leading-4 text-forest">
                    {count}
                  </span>
                )}
              </span>
              Keranjang
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
