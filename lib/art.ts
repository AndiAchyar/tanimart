// Ilustrasi SVG cadangan: tampil otomatis kalau foto produk gagal dimuat.
const ART: Record<string, string> = {
  susu: '<rect x="178" y="58" width="44" height="16" rx="5" fill="#f4b72f"/><rect x="165" y="70" width="70" height="34" rx="8" fill="#d9e2cf"/><rect x="150" y="95" width="100" height="165" rx="22" fill="#fff"/><rect x="150" y="150" width="100" height="62" fill="#2e7d45"/><circle cx="200" cy="181" r="16" fill="#f4b72f"/>',
  telur:
    '<ellipse cx="200" cy="232" rx="135" ry="32" fill="#8a5a3c"/><ellipse cx="140" cy="200" rx="40" ry="52" fill="#fbf1e4"/><ellipse cx="205" cy="188" rx="42" ry="55" fill="#f7e6d0"/><ellipse cx="265" cy="205" rx="38" ry="50" fill="#fbf1e4"/>',
  ghee: '<rect x="130" y="76" width="140" height="32" rx="9" fill="#6b7f4f"/><rect x="118" y="105" width="164" height="152" rx="26" fill="#f4b72f"/><rect x="140" y="150" width="120" height="60" rx="10" fill="#fff6d8"/><circle cx="200" cy="180" r="14" fill="#2e7d45"/>',
  apel: '<path d="M200 100c-55-32-105 18-88 82 14 50 52 72 88 54 36 18 74-4 88-54 17-64-33-114-88-82z" fill="#d6392f"/><path d="M200 100c0-24 8-38 22-48" stroke="#5a3a22" stroke-width="8" stroke-linecap="round" fill="none"/><ellipse cx="238" cy="70" rx="26" ry="11" transform="rotate(-30 238 70)" fill="#2e7d45"/>',
  mangga:
    '<ellipse cx="200" cy="172" rx="98" ry="70" transform="rotate(-25 200 172)" fill="#f4a62f"/><ellipse cx="180" cy="194" rx="60" ry="38" transform="rotate(-25 180 194)" fill="#f0562f" opacity=".45"/><ellipse cx="268" cy="104" rx="30" ry="12" transform="rotate(-40 268 104)" fill="#2e7d45"/>',
  semangka:
    '<path d="M70 140a130 130 0 0 0 260 0z" fill="#2e7d45"/><path d="M80 140a120 120 0 0 0 240 0z" fill="#d9f0c0"/><path d="M90 140a110 110 0 0 0 220 0z" fill="#e8454f"/><g fill="#1b2a1f"><ellipse cx="150" cy="175" rx="5" ry="9"/><ellipse cx="200" cy="198" rx="5" ry="9"/><ellipse cx="250" cy="175" rx="5" ry="9"/></g>',
  kentang:
    '<ellipse cx="150" cy="192" rx="70" ry="48" transform="rotate(-15 150 192)" fill="#b98550"/><ellipse cx="252" cy="172" rx="62" ry="44" transform="rotate(20 252 172)" fill="#c99560"/><ellipse cx="205" cy="125" rx="52" ry="36" transform="rotate(-5 205 125)" fill="#a8743f"/><g fill="#7a5028"><circle cx="135" cy="187" r="4"/><circle cx="262" cy="167" r="4"/><circle cx="210" cy="122" r="4"/></g>',
  kelor:
    '<g stroke="#4f8f3a" stroke-width="16" stroke-linecap="round"><line x1="90" y1="232" x2="300" y2="72"/><line x1="120" y1="252" x2="332" y2="102"/><line x1="68" y1="196" x2="262" y2="50"/></g><g stroke="#7fb85a" stroke-width="4" stroke-linecap="round"><line x1="96" y1="226" x2="294" y2="76"/><line x1="126" y1="246" x2="326" y2="106"/><line x1="74" y1="190" x2="256" y2="54"/></g>',
  paprika:
    '<path d="M120 130c0-30 40-40 80-30 40-10 80 0 80 30 0 80-30 130-80 130s-80-50-80-130z" fill="#e5392f"/><path d="M200 100c-4-20 2-34 14-44" stroke="#2e7d45" stroke-width="10" stroke-linecap="round" fill="none"/><ellipse cx="165" cy="150" rx="12" ry="40" fill="#fff" opacity=".25"/>',
};

export type ArtKey = keyof typeof ART;

export function artUri(key: string): string {
  return (
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#e3ecd6"/><ellipse cx="200" cy="262" rx="120" ry="14" fill="#c9d8b8"/>' +
        (ART[key] ?? "") +
        "</svg>",
    )
  );
}
