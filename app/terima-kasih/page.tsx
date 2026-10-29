import Link from "next/link";
import { btnLeaf, panel } from "@/components/ui";

export default function TerimaKasihPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <div className={`${panel} w-[520px] max-w-full p-8 text-center`}>
        <h1 className="text-5xl font-extrabold text-leaf-dark">Terima kasih!</h1>
        <p className="mb-1 mt-4 text-lg">Masukan Anda sudah kami terima.</p>
        <p className="mb-6 text-muted">Kami akan segera membalas setelah pesan Anda dibaca.</p>
        <Link href="/" className={btnLeaf}>
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
