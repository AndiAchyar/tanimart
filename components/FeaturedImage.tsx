"use client";

import { useState } from "react";
import { artUri } from "@/lib/art";

/** Foto unggulan dari URL luar; bila gagal dimuat, diganti ilustrasi SVG lokal. */
export function FeaturedImage({
  src,
  alt,
  art,
}: {
  src: string;
  alt: string;
  art: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? artUri(art) : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[4/3] h-auto w-full bg-mist object-cover"
    />
  );
}
