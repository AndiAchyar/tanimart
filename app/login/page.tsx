"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { inputClass } from "@/components/ui";
import { login, register } from "@/lib/actions";

const formClass = "flex h-full flex-col justify-center gap-3 px-7 md:px-12";
const submitClass =
  "mt-1.5 rounded-xl bg-leaf px-7 py-3 text-[15px] font-bold text-white shadow-[0_8px_18px_-8px_rgba(46,125,69,0.8)] transition hover:bg-leaf-dark active:scale-[0.97] disabled:opacity-60";
const linkBtn = "font-bold text-leaf-dark underline";
const socials = [
  { label: "Facebook", short: "f", href: "https://www.facebook.com" },
  { label: "Instagram", short: "ig", href: "https://www.instagram.com" },
  { label: "Email", short: "@", href: "https://www.gmail.com" },
  { label: "Twitter", short: "x", href: "https://www.twitter.com" },
];

function Socials() {
  return (
    <div className="mt-2.5 flex items-center gap-2.5 border-t border-line pt-4">
      <span className="mr-1 text-[13px] text-muted">Ikuti kami</span>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-9 place-items-center rounded-full border-[1.5px] border-line text-[13px] font-bold text-forest transition hover:border-forest hover:bg-forest hover:text-white"
        >
          {s.short}
        </a>
      ))}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const r = await login(String(f.get("email")), String(f.get("password")), "user");
    setBusy(false);
    if (r.ok) router.push("/");
    else setError(r.error);
  }

  async function onRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    const r = await register(
      String(f.get("name")),
      String(f.get("email")),
      String(f.get("password")),
      String(f.get("confirm")),
    );
    setBusy(false);
    if (r.ok) {
      form.reset();
      setError("");
      setSignUp(false);
      alert("Pendaftaran berhasil. Silakan masuk.");
    } else {
      alert(r.error);
    }
  }

  const slide = "transition-all duration-[600ms] ease-in-out";

  return (
    <main
      className="grid min-h-screen place-items-center px-4 py-6"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, #dcebc4 0, transparent 38%), radial-gradient(circle at 90% 85%, #f9e7b4 0, transparent 34%), var(--paper)",
      }}
    >
      <div className="relative min-h-[640px] w-[880px] max-w-full overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-25px_rgba(22,58,36,0.45)] md:min-h-[580px] md:rounded-[28px]">
        {/* Daftar */}
        <div
          className={`${slide} absolute left-0 top-0 h-full w-full bg-white md:w-1/2 ${
            signUp
              ? "z-[5] opacity-100 md:translate-x-full"
              : "pointer-events-none z-[1] opacity-0"
          }`}
          aria-hidden={!signUp}
        >
          <form onSubmit={onRegister} className={formClass}>
            <BrandMark size={40} />
            <h1 className="text-[30px] font-extrabold text-forest">Buat akun</h1>
            <p className="mb-1.5 text-sm text-muted">Hanya perlu sebentar. Hasil tani segar menanti Anda.</p>
            <input name="name" required placeholder="Nama" autoComplete="name" className={inputClass} />
            <input name="email" type="email" required placeholder="Alamat email" autoComplete="email" className={inputClass} />
            <input name="password" type="password" required placeholder="Kata sandi" autoComplete="new-password" className={inputClass} />
            <input name="confirm" type="password" required placeholder="Ulangi kata sandi" autoComplete="new-password" className={inputClass} />
            <button type="submit" disabled={busy} className={submitClass}>Daftar</button>
            <p className="text-sm text-muted md:hidden">
              Sudah punya akun?{" "}
              <button type="button" className={linkBtn} onClick={() => setSignUp(false)}>Masuk</button>
            </p>
            <Socials />
          </form>
        </div>

        {/* Masuk */}
        <div
          className={`${slide} absolute left-0 top-0 h-full w-full bg-white md:w-1/2 ${
            signUp
              ? "pointer-events-none z-[2] opacity-0 md:translate-x-full"
              : "z-[2] opacity-100"
          }`}
          aria-hidden={signUp}
        >
          <form onSubmit={onLogin} className={formClass}>
            <BrandMark size={40} />
            <h1 className="text-[30px] font-extrabold text-forest">Masuk</h1>
            <p className="mb-1.5 text-sm text-muted">Masuk untuk memesan hasil tani segar.</p>
            <input name="email" type="email" required placeholder="Alamat email" autoComplete="email" className={inputClass} />
            <input name="password" type="password" required placeholder="Kata sandi" autoComplete="current-password" className={inputClass} />
            <button type="submit" disabled={busy} className={submitClass}>Masuk</button>
            <p role="alert" className="min-h-[18px] text-sm text-danger">{error}</p>
            <p className="text-sm text-muted md:hidden">
              Belum punya akun?{" "}
              <button type="button" className={linkBtn} onClick={() => setSignUp(true)}>Daftar</button>
            </p>
            <a href="/petani/login" className="text-sm text-muted underline hover:text-forest">
              Masuk sebagai petani
            </a>
            <Socials />
          </form>
        </div>

        {/* Overlay (desktop) */}
        <div
          className={`${slide} absolute left-1/2 top-0 z-[100] hidden h-full w-1/2 overflow-hidden md:block ${
            signUp ? "-translate-x-full" : ""
          }`}
        >
          <div
            className={`${slide} relative -left-full h-full w-[200%] overflow-hidden bg-forest text-white before:absolute before:-top-[70px] before:right-[28%] before:size-[220px] before:rounded-full before:bg-marigold before:content-[''] after:absolute after:-bottom-[120px] after:-left-[10%] after:-right-[10%] after:h-[300px] after:rounded-t-[50%] after:bg-leaf after:shadow-[0_-60px_0_-20px_#3b9455] after:content-[''] ${
              signUp ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div
              className={`${slide} absolute top-0 z-[2] flex h-full w-1/2 flex-col items-center justify-center gap-3.5 px-11 text-center ${
                signUp ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            >
              <h2 className="text-[34px] font-extrabold">Selamat datang</h2>
              <p className="text-[15px] leading-relaxed text-[#e4efd8]">Mulailah perjalanan hidup sehat Anda dari sini.</p>
              <p className="mt-2 font-bold text-marigold">Sudah punya akun?</p>
              <button type="button" onClick={() => setSignUp(false)} className="rounded-xl bg-marigold px-7 py-3 font-bold text-forest shadow-[0_8px_18px_-8px_rgba(0,0,0,0.5)] transition hover:bg-[#ffc94d] active:scale-[0.97]">Masuk</button>
            </div>
            <div
              className={`${slide} absolute right-0 top-0 z-[2] flex h-full w-1/2 flex-col items-center justify-center gap-3.5 px-11 text-center ${
                signUp ? "translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <h2 className="text-[34px] font-extrabold">TaniMart</h2>
              <p className="text-[15px] leading-relaxed text-[#e4efd8]">
                Kami berkomitmen menghadirkan hasil pertanian terbaik ke dapur Anda. Makan sehat, hidup bahagia.
              </p>
              <p className="mt-2 font-bold text-marigold">Belum punya akun?</p>
              <button type="button" onClick={() => setSignUp(true)} className="rounded-xl bg-marigold px-7 py-3 font-bold text-forest shadow-[0_8px_18px_-8px_rgba(0,0,0,0.5)] transition hover:bg-[#ffc94d] active:scale-[0.97]">Daftar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
