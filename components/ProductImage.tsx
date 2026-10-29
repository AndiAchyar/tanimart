"use client";

import { ImageOff } from "lucide-react";
import { useState } from "react";

/** Gambar produk dengan cadangan ikon bila gagal dimuat. Sumber boleh path publik atau data URL. */
export function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        className={`grid place-items-center bg-mist text-[#9bb88a] ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff size={40} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={`bg-mist object-cover ${className}`}
    />
  );
}
