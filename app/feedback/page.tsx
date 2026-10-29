"use client";

import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { btnLeaf, inputClass, panel } from "@/components/ui";

export default function FeedbackPage() {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <div className={`${panel} w-[560px] max-w-full p-6 sm:p-8`}>
        <div className="mb-5 flex items-center gap-3">
          <BrandMark size={44} />
          <div>
            <h1 className="text-[28px] font-extrabold text-forest">Kirim masukan</h1>
            <p className="text-sm text-muted">Kritik dan saran Anda membantu kami berkembang.</p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/terima-kasih");
          }}
          className="grid gap-3.5"
        >
          <input name="name" required placeholder="Nama*" autoComplete="name" className={inputClass} />
          <input name="email" type="email" required placeholder="Email*" autoComplete="email" className={inputClass} />
          <input name="phone" type="tel" placeholder="Telepon (opsional)" autoComplete="tel" className={inputClass} />
          <textarea name="message" required rows={5} placeholder="Pesan*" className={inputClass} />
          <button type="submit" className={btnLeaf}>
            <Send size={16} /> Kirim
          </button>
        </form>
        <Link href="/" className="mt-5 inline-flex items-center gap-2 text-sm text-muted hover:text-forest">
          <ArrowLeft size={14} /> Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
