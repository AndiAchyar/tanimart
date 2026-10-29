import type { ReactNode } from "react";

export function PageHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="relative overflow-hidden bg-forest pb-11 pt-10 text-white">
      <span
        className="absolute -top-[110px] right-[6%] size-[220px] rounded-full bg-marigold"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-[min(1120px,100%-40px)]">
        <h1 className="mb-1.5 text-[clamp(28px,4vw,40px)] font-extrabold">{title}</h1>
        <p className="max-w-[46ch] text-[#e4efd8]">{subtitle}</p>
      </div>
    </header>
  );
}

export function Alert({
  tone,
  children,
}: {
  tone: "success" | "error";
  children: ReactNode;
}) {
  const style =
    tone === "success" ? "bg-[#d8ecd0] text-forest" : "bg-[#fde8e5] text-[#8c241a]";
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-[14px] px-4 py-3 font-bold shadow-[0_10px_24px_-16px_rgba(22,58,36,0.6)] ${style}`}
    >
      {children}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  text,
  children,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="px-4 py-14 text-center text-muted">
      <div className="mb-3 flex justify-center text-[#9bb88a]">{icon}</div>
      <h2 className="mb-1 text-xl text-ink">{title}</h2>
      <p className="mb-4">{text}</p>
      {children}
    </div>
  );
}

export const panel =
  "rounded-[20px] bg-white shadow-[0_12px_28px_-18px_rgba(22,58,36,0.5)]";

export const inputClass =
  "w-full rounded-xl border-[1.5px] border-transparent bg-paper px-4 py-3 text-[15px] outline-none transition placeholder:text-[#8a978a] focus:border-leaf focus:bg-white focus:shadow-[0_0_0_4px_rgba(46,125,69,0.15)]";

export const btnLeaf =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-leaf px-6 py-3 font-bold text-white shadow-[0_8px_18px_-8px_rgba(46,125,69,0.8)] transition hover:bg-leaf-dark active:scale-[0.97] disabled:opacity-50";

export const btnGold =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-marigold px-6 py-3 font-extrabold text-forest shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] transition hover:bg-[#ffc94d] active:scale-[0.97]";

export const btnSoft =
  "inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-line bg-white px-5 py-3 font-bold text-forest transition hover:bg-mist";

export const container = "mx-auto w-[min(1120px,100%-40px)]";
