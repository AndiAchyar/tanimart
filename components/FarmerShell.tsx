"use client";

import { Box, LogOut, PlusCircle, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { logout } from "@/lib/actions";
import { useHydrated, useSession } from "@/lib/store";
import { BrandMark } from "./BrandMark";

type Active = "products" | "add" | "delivery";

/** Kerangka dashboard petani + penjaga akses (hanya sesi berperan petani). */
export function FarmerShell({ active, children }: { active: Active; children: ReactNode }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const session = useSession();
  const allowed = session?.role === "farmer";

  useEffect(() => {
    if (!hydrated || allowed) return;
    router.replace(session?.role === "user" ? "/" : "/petani/login");
  }, [hydrated, allowed, session, router]);

  if (!allowed) {
    return <div className="grid min-h-screen place-items-center text-muted">Memeriksa akses…</div>;
  }

  const item =
    "flex items-center gap-3 rounded-xl px-3.5 py-3 font-bold text-[#e4efd8] transition hover:bg-leaf hover:text-white max-md:flex-1 max-md:justify-center max-md:text-sm";
  const on = "!bg-leaf !text-white";

  return (
    <div className="min-h-screen">
      <aside
        aria-label="Navigasi dashboard petani"
        className="bg-forest p-4 text-white md:fixed md:inset-y-0 md:left-0 md:z-20 md:w-[250px] md:px-[18px] md:py-7"
      >
        <div className="mb-2.5 flex items-center gap-3 font-display text-xl font-extrabold md:mx-2 md:mb-9 md:text-[22px]">
          <BrandMark icon="tractor" size={42} />
          TaniMart
        </div>
        <nav className="flex flex-wrap gap-1.5 md:grid md:gap-2">
          <Link href="/petani" className={`${item} ${active === "products" ? on : ""}`}>
            <Box size={18} /> Produk
          </Link>
          <Link href="/petani/tambah" className={`${item} ${active === "add" ? on : ""}`}>
            <PlusCircle size={18} /> Tambah Produk
          </Link>
          <Link href="/petani#pengiriman" className={`${item} ${active === "delivery" ? on : ""}`}>
            <Truck size={18} /> Pengiriman
          </Link>
          <button
            type="button"
            className={`${item} text-left`}
            onClick={() => {
              logout();
              router.replace("/petani/login");
            }}
          >
            <LogOut size={18} /> Keluar
          </button>
        </nav>
      </aside>
      <div className="md:ml-[250px]">{children}</div>
    </div>
  );
}
