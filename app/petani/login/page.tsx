"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { inputClass } from "@/components/ui";
import { login } from "@/lib/actions";

export default function PetaniLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const r = await login(String(f.get("email")), String(f.get("password")), "farmer");
    setBusy(false);
    if (r.ok) router.push("/petani");
    else setError(r.error);
  }

  return (
    <main
      className="grid min-h-screen place-items-center px-4 py-6"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, #dcebc4 0, transparent 38%), radial-gradient(circle at 90% 85%, #f9e7b4 0, transparent 34%), var(--paper)",
      }}
    >
      <div className="w-[440px] max-w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-25px_rgba(22,58,36,0.45)]">
        <div className="flex flex-col items-center gap-3 bg-forest px-6 pb-6 pt-8 text-white">
          <BrandMark icon="tractor" size={56} />
          <h1 className="text-[28px] font-extrabold">Masuk Petani</h1>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 px-6 pb-8 pt-6 sm:px-9">
          <p className="mb-2 text-sm text-muted">Masuk untuk mengelola produk dan pesanan Anda.</p>

          <label htmlFor="email" className="text-sm font-semibold">Alamat email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="nama@contoh.com" className={inputClass} />

          <label htmlFor="password" className="mt-2 text-sm font-semibold">Kata sandi</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Masukkan kata sandi"
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-forest"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-3 rounded-xl bg-leaf px-7 py-3 text-[15px] font-bold text-white shadow-[0_8px_18px_-8px_rgba(46,125,69,0.8)] transition hover:bg-leaf-dark active:scale-[0.98] disabled:opacity-60"
          >
            Masuk
          </button>
          <p role="alert" aria-live="polite" className="mt-1 min-h-5 text-sm text-danger">{error}</p>
          <Link href="/" className="mt-1 flex items-center gap-2 text-sm text-muted hover:text-forest">
            <ArrowLeft size={14} /> Kembali ke beranda
          </Link>
        </form>
      </div>
    </main>
  );
}
