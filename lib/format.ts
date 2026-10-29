export const rupiah = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

export const PAYMENT_LABELS = {
  cod: "Bayar di tempat (COD)",
  netbanking: "Internet banking",
  cards: "Kartu debit/kredit",
} as const;

export const DELIVERY_LABELS = {
  pending: "Menunggu",
  in_delivery: "Dalam Pengiriman",
  delivered: "Terkirim",
} as const;
