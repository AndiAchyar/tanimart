"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FarmerShell } from "@/components/FarmerShell";
import { Alert, btnLeaf, inputClass, panel } from "@/components/ui";
import { addProduct, imageToDataUrl } from "@/lib/actions";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function TambahProdukPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim();
    const price = Number(f.get("price"));
    const stock = Number(f.get("stock"));
    const file = f.get("image");

    if (!name || name.length > 255) return setError("Nama produk wajib diisi dan maksimal 255 karakter.");
    if (!Number.isFinite(price) || price <= 0) return setError("Harga harus berupa angka lebih dari 0.");
    if (!Number.isInteger(stock) || stock < 0) return setError("Stok harus berupa bilangan bulat 0 atau lebih.");
    if (!(file instanceof File) || file.size === 0) return setError("Pilih gambar produk yang valid untuk diunggah.");
    if (file.size > MAX_BYTES) return setError("Ukuran gambar maksimal 5 MB.");
    if (!TYPES.includes(file.type)) return setError("Format gambar harus JPG, PNG, atau WEBP.");

    setBusy(true);
    try {
      const image = await imageToDataUrl(file);
      const r = addProduct({ name, price, stock, image });
      if (r.ok) router.push("/petani");
      else setError(r.error);
    } catch {
      setError("Gambar produk gagal diproses. Coba gambar lain.");
    } finally {
      setBusy(false);
    }
  }

  const label = "grid gap-1.5 font-bold text-forest";

  return (
    <FarmerShell active="add">
      <main className="mx-auto w-[min(760px,100%-32px)] py-8 md:py-14">
        <h1 className="mb-2 text-[clamp(26px,4vw,36px)] text-forest">Tambah Produk Baru</h1>
        <p className="mb-6 text-muted">Isi informasi produk agar tampil di katalog belanja.</p>
        <section className={`${panel} p-5 md:p-[26px]`}>
          {error && (
            <div className="mb-[18px]">
              <Alert tone="error">{error}</Alert>
            </div>
          )}
          <form onSubmit={onSubmit} className="grid gap-4">
            <label className={label}>
              Nama produk
              <input name="name" maxLength={255} required className={inputClass} />
            </label>
            <label className={label}>
              Harga (Rp)
              <input name="price" type="number" min={1} step={1} required className={inputClass} />
            </label>
            <label className={label}>
              Stok
              <input name="stock" type="number" min={0} step={1} required className={inputClass} />
            </label>
            <label className={label}>
              Foto produk (JPG, PNG, atau WEBP; maks. 5 MB)
              <input name="image" type="file" accept="image/jpeg,image/png,image/webp" required className={inputClass} />
            </label>
            <button type="submit" disabled={busy} className={btnLeaf}>
              <Save size={18} /> {busy ? "Menyimpan…" : "Simpan Produk"}
            </button>
          </form>
        </section>
        <Link href="/petani" className="mt-5 inline-flex items-center gap-2 font-bold text-leaf-dark">
          <ArrowLeft size={16} /> Kembali ke dashboard
        </Link>
      </main>
    </FarmerShell>
  );
}
