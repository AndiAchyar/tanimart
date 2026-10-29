import { Leaf, Tractor } from "lucide-react";

export function BrandMark({
  size = 36,
  icon = "leaf",
}: {
  size?: number;
  icon?: "leaf" | "tractor";
}) {
  const Icon = icon === "leaf" ? Leaf : Tractor;
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[11px_11px_11px_4px] bg-leaf text-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Icon size={Math.round(size * 0.5)} />
    </span>
  );
}
