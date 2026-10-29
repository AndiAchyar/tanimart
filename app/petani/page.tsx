"use client";

import { Check, PackageOpen, Plus, Sprout, Trash2, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FarmerShell } from "@/components/FarmerShell";
import { ProductImage } from "@/components/ProductImage";
import { Alert, EmptyState, panel } from "@/components/ui";
import { addStock, advanceOrder, deleteProduct } from "@/lib/actions";
import { DELIVERY_LABELS, PAYMENT_LABELS, rupiah } from "@/lib/format";
import { useOrders, useProducts } from "@/lib/store";
import type { DeliveryStatus, Product } from "@/lib/types";

const statusStyle: Record<DeliveryStatus, string> = {
  pending: "bg-[#f0f2ed] text-muted",
  in_delivery: "bg-[#fdf2d3] text-[#7a5600]",
  delivered: "bg-mist text-forest",
};

function ProductCard({ product, onNotice }: {
  product: Product;
  onNotice: (n: { tone: "success" | "error"; text: string }) => void;
}) {
  const [amount, setAmount] = useState(1);

  return (
    <article className="overflow-hidden rounded-[14px] border border-line bg-white">
      <ProductImage src={product.image} alt={product.name} className="h-[150px] w-full" />
      <div className="p-3">
        <h3 className="mb-1.5 text-[17px] text-forest">{product.name}</h3>
        <p className="font-extrabold text-leaf-dark">{rupiah(product.price)}</p>
        <p className="mt-0.5 text-sm text-muted">Stok: {product.stock}</p>
        <div className="mt-3.5 grid gap-2">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const r = addStock(product.id, amount);
              onNotice(
                r.ok
                  ? { tone: "success", text: `Stok ${product.name} berhasil ditambahkan.` }
                  : { tone: "error", text: r.error },
              );
            }}
          >
            <input
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label={`Jumlah stok tambahan untuk ${product.name}`}
              required
              className="w-[56px] min-w-0 rounded-[9px] border border-line p-2"
            />
            <button
              type="submit"
              className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[9px] bg-leaf px-2.5 text-[13px] font-extrabold text-white hover:bg-leaf-dark"
            >
              <Plus size={14} /> Tambah Stok
            </button>
          </form>
          <button
            type="button"
            className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-[9px] bg-[#fde8e5] text-[13px] font-extrabold text-[#8c241a] hover:bg-[#f8d3cd]"
            onClick={() => {
              if (!confirm("Yakin ingin menghapus produk ini?")) return;
              deleteProduct(product.id);
              onNotice({ tone: "success", text: "Produk berhasil dihapus." });
            }}
          >
            <Trash2 size={14} /> Hapus Produk
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PetaniPage() {
  const products = useProducts();
  const orders = useOrders();
  const [productNotice, setProductNotice] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const th = "whitespace-nowrap border-b-2 border-line px-3.5 py-3 text-[13px] font-bold text-muted";
  const td = "border-b border-line px-3.5 py-3.5 align-top text-[15px]";
  // Pesanan terbaru di atas.
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  return (
    <FarmerShell active="products">
      <header className="relative overflow-hidden bg-forest pb-14 pt-11 text-white after:absolute after:-bottom-[110px] after:-left-[10%] after:-right-[10%] after:h-[150px] after:rounded-t-[50%] after:bg-leaf after:shadow-[0_-26px_0_-10px_#3b9455] after:content-[''] before:absolute before:-top-[120px] before:right-[6%] before:size-60 before:rounded-full before:bg-marigold before:content-['']">
        <div className="relative z-[2] mx-auto flex w-[min(1180px,100%-40px)] items-center gap-4">
          <div>
            <h1 className="text-[clamp(26px,4vw,38px)] font-extrabold">Halo, Petani</h1>
            <p className="mt-1.5 text-[#e4efd8]">Kelola produk dan pesanan Anda.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(1180px,100%-40px)] pb-12 pt-7">
        <div className="mb-3 flex justify-end">
          <Link
            href="/petani/tambah"
            className="inline-flex items-center gap-2 rounded-xl bg-marigold px-4 py-2.5 font-extrabold text-forest hover:bg-[#ffc94d]"
          >
            <Plus size={16} /> Tambah Produk
          </Link>
        </div>

        <section id="produk" className={`${panel} p-2 pb-3`} aria-labelledby="products-title">
          <div className="flex items-center justify-between px-4 pb-3 pt-3.5">
            <h2 id="products-title" className="text-[22px] text-forest">Produk Anda</h2>
            <span className="text-sm text-muted">{products.length} produk</span>
          </div>
          {productNotice && (
            <div className="mx-2 mb-3">
              <Alert tone={productNotice.tone}>{productNotice.text}</Alert>
            </div>
          )}
          {products.length === 0 ? (
            <EmptyState
              icon={<Sprout size={48} />}
              title="Belum ada produk"
              text="Tambahkan produk pertama Anda agar tampil di katalog."
            />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-2 max-[420px]:grid-cols-1">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onNotice={setProductNotice} />
              ))}
            </div>
          )}
        </section>

        <section id="pengiriman" className={`${panel} mt-6 p-2 pb-3`}>
          <div className="flex items-baseline justify-between px-4 pb-1.5 pt-3.5 text-sm text-muted">
            <span>Pesanan masuk</span>
            <strong className="font-display text-xl text-forest">{orders.length}</strong>
          </div>
          {orders.length === 0 ? (
            <EmptyState
              icon={<PackageOpen size={48} />}
              title="Belum ada pesanan"
              text="Pesanan baru akan muncul di sini."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className={th}>No. pesanan</th>
                    <th className={th}>Pelanggan</th>
                    <th className={th}>Telepon</th>
                    <th className={th}>Alamat</th>
                    <th className={th}>Produk</th>
                    <th className={th}>Pembayaran</th>
                    <th className={th}>Total</th>
                    <th className={th}>Status / Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((o) => (
                    <tr key={o.id} className="transition hover:bg-[#f6faf0]">
                      <td className={`${td} font-display font-extrabold text-forest`}>#{o.id}</td>
                      <td className={td}>
                        <div className="font-bold">{o.name}</div>
                        <div className="text-sm text-muted">{o.email}</div>
                      </td>
                      <td className={td}>{o.phone}</td>
                      <td className={`${td} min-w-[200px] whitespace-pre-line`}>{o.address}</td>
                      <td className={td}>
                        {o.items.map((i) => (
                          <span key={i.name} className="mb-1 mr-1 inline-block whitespace-nowrap rounded-full bg-mist px-2.5 py-0.5 text-[13px] font-semibold text-forest">
                            {i.name}({i.qty})
                          </span>
                        ))}
                      </td>
                      <td className={td}>
                        <span className="inline-block whitespace-nowrap rounded-full bg-[#fdf2d3] px-3 py-1 text-[13px] font-bold text-[#7a5600]">
                          {PAYMENT_LABELS[o.payment]}
                        </span>
                      </td>
                      <td className={`${td} whitespace-nowrap font-display font-extrabold text-leaf-dark`}>{rupiah(o.total)}</td>
                      <td className={td}>
                        <div className="grid gap-2">
                          <span className={`inline-block w-fit whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-extrabold ${statusStyle[o.status]}`}>
                            {DELIVERY_LABELS[o.status]}
                          </span>
                          {o.status !== "delivered" && (
                            <button
                              type="button"
                              onClick={() => advanceOrder(o.id)}
                              className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-xl bg-marigold px-4 py-2.5 text-sm font-extrabold text-forest shadow-[0_8px_16px_-10px_rgba(0,0,0,0.5)] transition hover:bg-[#ffc94d] active:scale-[0.97]"
                            >
                              {o.status === "pending" ? <Truck size={16} /> : <Check size={16} />}
                              {o.status === "pending" ? "Mulai Pengiriman" : "Tandai Terkirim"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </FarmerShell>
  );
}
