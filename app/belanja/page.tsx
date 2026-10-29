"use client";

import { Sprout, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import { ShopNav } from "@/components/ShopNav";
import {
  Alert,
  EmptyState,
  PageHead,
  btnLeaf,
  inputClass,
  panel,
} from "@/components/ui";
import { addToCart } from "@/lib/actions";
import { rupiah } from "@/lib/format";
import { useCart, useProducts } from "@/lib/store";
import type { Product } from "@/lib/types";

type Notice = { tone: "success" | "error"; text: string } | null;

function ProductCard({ product, inCart, onNotice }: {
  product: Product;
  inCart: boolean;
  onNotice: (n: Notice) => void;
}) {
  const [qty, setQty] = useState(1);
  const soldOut = product.stock < 1;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = addToCart(product, qty);
    onNotice(
      result.ok
        ? { tone: "success", text: `${product.name} ditambahkan ke keranjang!` }
        : { tone: "error", text: result.error },
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <article className={`${panel} flex h-full flex-col overflow-hidden transition hover:-translate-y-1`}>
      <ProductImage
        src={product.image}
        alt={product.name}
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="font-display text-[22px] font-extrabold text-leaf-dark">
          {rupiah(product.price)}
        </p>
        <p className="mb-3.5 text-sm text-muted">
          {soldOut ? "Stok habis" : `Stok: ${product.stock}`}
        </p>
        <form onSubmit={submit} className="mt-auto">
          <label className="block text-[13px] font-semibold text-muted">
            Jumlah
            <input
              type="number"
              min={1}
              max={Math.max(product.stock, 1)}
              value={qty}
              disabled={soldOut}
              onChange={(e) => setQty(Number(e.target.value))}
              className={`${inputClass} mt-1 !py-2.5 font-semibold`}
            />
          </label>
          <button
            type="submit"
            disabled={soldOut || inCart}
            className={`${btnLeaf} mt-2 w-full`}
          >
            <ShoppingBasket size={18} />
            {inCart ? "Sudah di keranjang" : "Tambah ke keranjang"}
          </button>
        </form>
      </div>
    </article>
  );
}

export default function BelanjaPage() {
  const products = useProducts();
  const cart = useCart();
  const [notice, setNotice] = useState<Notice>(null);

  return (
    <>
      <ShopNav active="/belanja" />
      <PageHead
        title="Belanja hasil tani segar"
        subtitle="Pilih produk, atur jumlahnya, lalu tambahkan ke keranjang."
      />
      <main className="mx-auto my-6 w-[min(1120px,100%-40px)]">
        {notice && (
          <div className="mb-5">
            <Alert tone={notice.tone}>{notice.text}</Alert>
          </div>
        )}
        {products.length === 0 ? (
          <div className={panel}>
            <EmptyState
              icon={<Sprout size={48} />}
              title="Belum ada produk"
              text="Produk akan muncul di sini setelah ditambahkan petani."
            />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                inCart={cart.some((i) => i.productId === p.id)}
                onNotice={setNotice}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
