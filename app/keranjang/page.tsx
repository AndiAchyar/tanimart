"use client";

import { ArrowLeft, CreditCard, ShoppingBasket, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import { ShopNav } from "@/components/ShopNav";
import {
  Alert,
  EmptyState,
  PageHead,
  btnGold,
  btnLeaf,
  btnSoft,
  inputClass,
  panel,
} from "@/components/ui";
import { clearCart, removeFromCart, setCartQty } from "@/lib/actions";
import { rupiah } from "@/lib/format";
import { useCart } from "@/lib/store";

export default function KeranjangPage() {
  const cart = useCart();
  const [notice, setNotice] = useState("");
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      <ShopNav active="/keranjang" />
      <PageHead
        title="Keranjang belanja"
        subtitle="Atur jumlah atau hapus produk sebelum lanjut ke checkout."
      />
      <main className="mx-auto my-6 w-[min(1000px,100%-40px)]">
        {notice && (
          <div className="mb-5">
            <Alert tone="success">{notice}</Alert>
          </div>
        )}

        {cart.length === 0 ? (
          <div className={panel}>
            <EmptyState
              icon={<ShoppingBasket size={48} />}
              title="Keranjang Anda masih kosong"
              text="Yuk, pilih sayur, buah, dan produk segar lainnya."
            >
              <Link href="/belanja" className={btnLeaf}>
                Mulai belanja
              </Link>
            </EmptyState>
          </div>
        ) : (
          <div className={`${panel} px-6 pb-6 pt-2`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b-2 border-line text-[13px] text-muted">
                    <th className="px-3 pb-3 pt-[18px]">Foto</th>
                    <th className="px-3 pb-3 pt-[18px]">Produk</th>
                    <th className="px-3 pb-3 pt-[18px]">Harga</th>
                    <th className="px-3 pb-3 pt-[18px]">Jumlah</th>
                    <th className="px-3 pb-3 pt-[18px]">Subtotal</th>
                    <th className="px-3 pb-3 pt-[18px] text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-line bg-white px-3 py-1.5 text-[13px] font-bold text-danger transition hover:bg-[#fdecea]"
                        onClick={() => {
                          if (confirm("Yakin ingin mengosongkan keranjang?")) {
                            clearCart();
                            setNotice("Semua item dihapus dari keranjang!");
                          }
                        }}
                      >
                        <Trash2 size={14} /> Kosongkan
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.productId} className="border-b border-line">
                      <td className="px-3 py-3.5">
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                          className="size-16 rounded-xl"
                        />
                      </td>
                      <td className="px-3 py-3.5 font-bold">{item.name}</td>
                      <td className="px-3 py-3.5">{rupiah(item.price)}</td>
                      <td className="px-3 py-3.5">
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          aria-label={`Jumlah ${item.name}`}
                          onChange={(e) => setCartQty(item.productId, Number(e.target.value))}
                          className={`${inputClass} !w-[84px] !py-2.5 font-semibold`}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 font-display font-extrabold text-leaf-dark">
                        {rupiah(item.price * item.qty)}
                      </td>
                      <td className="px-3 py-3.5 text-right">
                        <button
                          type="button"
                          aria-label={`Hapus ${item.name}`}
                          className="inline-grid size-[38px] place-items-center rounded-full text-danger transition hover:bg-[#fdecea]"
                          onClick={() => {
                            if (confirm("Yakin ingin menghapus produk ini?")) {
                              removeFromCart(item.productId);
                              setNotice(`${item.name} dihapus dari keranjang!`);
                            }
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
              <Link href="/belanja" className={btnSoft}>
                <ArrowLeft size={16} /> Lanjut belanja
              </Link>
              <div className="flex flex-wrap items-center gap-5">
                <div className="text-right">
                  <span className="block text-sm font-semibold text-muted">Total belanja</span>
                  <strong className="font-display text-[30px] font-extrabold leading-tight text-leaf-dark">
                    {rupiah(total)}
                  </strong>
                </div>
                <Link href="/checkout" className={btnGold}>
                  <CreditCard size={18} /> Lanjut Pembayaran
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
