"use client";

import { Leaf, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ShopNav } from "@/components/ShopNav";
import {
  Alert,
  EmptyState,
  PageHead,
  btnGold,
  btnLeaf,
  inputClass,
  panel,
} from "@/components/ui";
import { placeOrder } from "@/lib/actions";
import { PAYMENT_LABELS, rupiah } from "@/lib/format";
import { useCart } from "@/lib/store";
import type { Order, PaymentMode } from "@/lib/types";

const labelClass = "mb-1 block text-sm font-semibold";

export default function CheckoutPage() {
  const cart = useCart();
  const [done, setDone] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<PaymentMode | "">("");
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!payment) {
      setError("Pilih metode pembayaran.");
      return;
    }
    const f = new FormData(e.currentTarget);
    const result = placeOrder({
      name: String(f.get("name")).trim(),
      email: String(f.get("email")).trim(),
      phone: String(f.get("phone")).trim(),
      address: String(f.get("address")).trim(),
      payment,
    });
    if (result.ok) {
      setDone(result.order);
      setError("");
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <ShopNav active="/checkout" />
      <PageHead
        title="Selesaikan pesanan Anda"
        subtitle="Periksa ringkasan belanja, isi data pengiriman, lalu pilih cara pembayaran."
      />
      <main className="mx-auto my-6 w-[min(720px,100%-40px)] pb-6">
        {done ? (
          <div className={`${panel} p-8 text-center`} role="status">
            <h2 className="text-4xl font-extrabold text-leaf-dark">Terima kasih!</h2>
            <p className="mb-5 mt-1 text-lg font-semibold">Pesanan #{done.id} berhasil dibuat.</p>
            <div className="mb-5 rounded-xl bg-mist p-3 font-semibold text-forest">
              {done.items.map((i) => `${i.name}(${i.qty})`).join(", ")}
            </div>
            <dl className="mb-6 grid gap-1 text-left sm:mx-auto sm:max-w-sm">
              <div className="flex justify-between"><dt className="text-muted">Nama</dt><dd>{done.name}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Email</dt><dd>{done.email}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Telepon</dt><dd>{done.phone}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Pembayaran</dt><dd>{PAYMENT_LABELS[done.payment]}</dd></div>
              <div className="flex justify-between border-t border-line pt-2 font-bold"><dt>Total</dt><dd className="text-leaf-dark">{rupiah(done.total)}</dd></div>
            </dl>
            <Link href="/belanja" className={btnLeaf}>Belanja lagi</Link>
          </div>
        ) : cart.length === 0 ? (
          <div className={panel}>
            <EmptyState
              icon={<ShoppingBasket size={48} />}
              title="Keranjang Anda masih kosong"
              text="Tambahkan produk terlebih dahulu sebelum checkout."
            >
              <Link href="/belanja" className={btnLeaf}>Mulai belanja</Link>
            </EmptyState>
          </div>
        ) : (
          <>
            <section className={`${panel} mb-6 p-6`}>
              <h2 className="mb-3 text-xl font-extrabold text-forest">Ringkasan belanja</h2>
              <ul className="mb-3.5">
                {cart.map((i) => (
                  <li key={i.productId} className="flex items-center gap-2.5 border-b border-dashed border-line py-2">
                    <Leaf size={16} className="text-leaf" />
                    <span className="flex-1">{i.name}({i.qty})</span>
                    <span className="text-muted">{rupiah(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between py-1.5 text-muted">
                <span>Ongkos kirim</span>
                <span className="font-bold text-leaf-dark">Gratis</span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between border-t-2 border-line pt-3 font-bold">
                <span>Total pembayaran</span>
                <strong className="font-display text-[26px] font-extrabold text-leaf-dark">{rupiah(total)}</strong>
              </div>
            </section>

            <form onSubmit={submit} className={`${panel} p-6`}>
              <h2 className="mb-3.5 text-xl font-extrabold text-forest">Data pengiriman</h2>
              <div className="mb-4">
                <label htmlFor="f-name" className={labelClass}>Nama lengkap</label>
                <input id="f-name" name="name" required autoComplete="name" placeholder="Contoh: Budi Santoso" className={inputClass} />
              </div>
              <div className="mb-4">
                <label htmlFor="f-email" className={labelClass}>Email</label>
                <input id="f-email" name="email" type="email" required autoComplete="email" placeholder="nama@email.com" className={inputClass} />
              </div>
              <div className="mb-4">
                <label htmlFor="f-phone" className={labelClass}>Nomor telepon</label>
                <input id="f-phone" name="phone" type="tel" required autoComplete="tel" placeholder="08xxxxxxxxxx" className={inputClass} />
              </div>
              <div className="mb-4">
                <label htmlFor="f-address" className={labelClass}>Alamat pengiriman</label>
                <textarea id="f-address" name="address" required rows={3} autoComplete="street-address" placeholder="Jalan, nomor rumah, kelurahan, kota" className={inputClass} />
              </div>

              <h2 className="mb-3.5 mt-6 text-xl font-extrabold text-forest">Metode pembayaran</h2>
              <select
                aria-label="Metode pembayaran"
                required
                value={payment}
                onChange={(e) => setPayment(e.target.value as PaymentMode)}
                className={`${inputClass} mb-5`}
              >
                <option value="" disabled>Pilih metode pembayaran</option>
                {(Object.keys(PAYMENT_LABELS) as PaymentMode[]).map((k) => (
                  <option key={k} value={k}>{PAYMENT_LABELS[k]}</option>
                ))}
              </select>

              {error && <div className="mb-4"><Alert tone="error">{error}</Alert></div>}
              <button type="submit" className={`${btnGold} h-[50px] w-full text-base`}>
                Pesan sekarang
              </button>
            </form>
          </>
        )}
      </main>
    </>
  );
}
