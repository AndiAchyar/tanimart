"use client";

import { LogIn, LogOut, Mail, MapPin, MessageSquare, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { FeaturedImage } from "@/components/FeaturedImage";
import { logout } from "@/lib/actions";
import { useSession } from "@/lib/store";

const categories = [
  {
    title: "Susu & Olahan",
    items: [
      { name: "Susu Segar", price: "Rp18.000", unit: "liter", art: "susu", src: "https://www.annammilk.com/timthumb.php?src=uploads/banner1.jpg" },
      { name: "Telur Ayam", price: "Rp55.000", unit: "rak", art: "telur", src: "https://www.licious.in/blog/wp-content/uploads/2022/03/Classic-Egg.jpg" },
      { name: "Minyak Samin", price: "Rp180.000", unit: "kg", art: "ghee", src: "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2021/05/ghee-041421-SG_770x533.jpg" },
    ],
  },
  {
    title: "Buah-buahan",
    items: [
      { name: "Apel", price: "Rp45.000", unit: "kg", art: "apel", src: "https://images.newindianexpress.com/uploads/user/imagelibrary/2021/8/19/w1200X800/abundance-apples-delicious-2487443.jpg" },
      { name: "Mangga", price: "Rp25.000", unit: "kg", art: "mangga", src: "https://sooryaonlineshopping.com/wp-content/uploads/2020/06/Mangoes.jpg" },
      { name: "Semangka", price: "Rp12.000", unit: "kg", art: "semangka", src: "https://static.india.com/wp-content/uploads/2022/05/watermelon-with-seeds.jpg" },
    ],
  },
  {
    title: "Sayuran",
    items: [
      { name: "Kentang", price: "Rp18.000", unit: "kg", art: "kentang", src: "https://cdn.shopify.com/s/files/1/0488/7855/1202/products/chefs_choice_potato_collection_tccpc_1200x.jpg?v=1651545825" },
      { name: "Kelor", price: "Rp15.000", unit: "kg", art: "kelor", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5Th-n6xg09Cjw8kQkKd5IKL2DmfjcG9WJQ&usqp=CAU" },
      { name: "Paprika", price: "Rp60.000", unit: "kg", art: "paprika", src: "https://ik.bebodywise.com/mosaic-wellness/image/upload/f_auto,w_1000,c_limit/v1647514400/BW%20BLOG/Untitled-design---2022-03-17T162312.140_11zon.jpg" },
    ],
  },
];

const navLink =
  "block rounded-[10px] px-3.5 py-2 text-[15px] font-semibold transition hover:bg-mist";
const wrap = "mx-auto w-[min(1120px,100%-40px)]";

export default function HomePage() {
  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
        <nav className={`${wrap} flex min-h-[68px] items-center justify-between`} aria-label="Navigasi utama">
          <a href="#" className="flex items-center gap-2.5 font-display text-[22px] font-extrabold text-forest">
            <BrandMark /> TaniMart
          </a>
          <button
            type="button"
            className="grid size-[42px] place-items-center rounded-[10px] border-[1.5px] border-line text-forest md:hidden"
            aria-label="Buka atau tutup navigasi"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu size={20} />
          </button>
          <ul
            className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[68px] flex-col gap-1.5 border-b border-line bg-paper px-5 pb-4 pt-3 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}
          >
            <li><a className={`${navLink} bg-forest !text-white`} aria-current="page" href="#" onClick={close}>Beranda</a></li>
            <li><a className={navLink} href="#products" onClick={close}>Produk Unggulan</a></li>
            <li><Link className={navLink} href="/belanja">Belanja</Link></li>
            <li><a className={navLink} href="#about-us" onClick={close}>Tentang Kami</a></li>
            <li><a className={navLink} href="#contact-us" onClick={close}>Kontak</a></li>
            <li>
              {session ? (
                <button
                  type="button"
                  className={`${navLink} flex w-full items-center gap-2 bg-marigold font-extrabold text-forest hover:!bg-[#ffc94d]`}
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                >
                  <LogOut size={16} /> Keluar
                </button>
              ) : (
                <Link
                  className={`${navLink} flex items-center gap-2 bg-marigold font-extrabold text-forest hover:!bg-[#ffc94d]`}
                  href="/login"
                >
                  <LogIn size={16} /> Masuk
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-forest text-white after:absolute after:-bottom-[170px] after:-left-[10%] after:-right-[10%] after:h-[280px] after:rounded-t-[50%] after:bg-leaf after:shadow-[0_-50px_0_-18px_#3b9455] after:content-['']">
          <div className={`${wrap} relative z-[2] grid items-center gap-10 pb-[110px] pt-12 md:grid-cols-[1.1fr_1fr] md:pb-[180px] md:pt-16`}>
            <div>
              <h1 className="text-[clamp(40px,6vw,68px)] font-extrabold">Tani Mart</h1>
              <p className="mb-7 mt-4 max-w-[28ch] text-[clamp(18px,2.2vw,24px)] text-[#e4efd8]">
                Dapatkan produk organik segar
              </p>
              <Link
                href="/belanja"
                className="inline-block rounded-xl bg-marigold px-7 py-3.5 font-bold text-forest shadow-[0_10px_20px_-10px_rgba(0,0,0,0.6)] transition hover:bg-[#ffc94d] active:scale-[0.97]"
              >
                Mulai Belanja
              </Link>
            </div>
            <div className="aspect-square w-[min(320px,80%)] justify-self-center rounded-full bg-marigold p-3.5 shadow-[0_28px_44px_-18px_rgba(0,0,0,0.6)] md:w-[min(420px,100%)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/h.jpg" alt="Hasil tani segar" className="size-full rounded-full object-cover" />
            </div>
          </div>
        </section>

        <section id="products" className={`${wrap} pb-6 pt-[72px]`}>
          {categories.map((cat) => (
            <div key={cat.title} className="mb-14">
              <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-line pb-3.5">
                <h2 className="text-3xl text-forest">{cat.title}</h2>
                <span className="text-sm text-muted">{cat.items.length} produk</span>
              </div>
              <div className="grid gap-6 min-[520px]:grid-cols-2 md:grid-cols-3">
                {cat.items.map((item) => (
                  <article
                    key={item.name}
                    className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_12px_28px_-18px_rgba(22,58,36,0.5)] transition hover:-translate-y-1 hover:shadow-[0_18px_32px_-16px_rgba(22,58,36,0.55)]"
                  >
                    <FeaturedImage src={item.src} alt={item.name} art={item.art} />
                    <div className="flex items-baseline justify-between gap-3 px-5 pb-5 pt-[18px]">
                      <h3 className="font-sans text-xl font-semibold">{item.name}</h3>
                      <span className="whitespace-nowrap font-display text-xl font-extrabold text-leaf-dark">
                        {item.price}
                        <small className="font-sans text-[13px] font-semibold text-muted">/{item.unit}</small>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-14 bg-forest pb-6 pt-14 text-[#dbe8cf]">
        <div className={wrap}>
          <div className="grid gap-7 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
            <div id="about-us">
              <h2 className="mb-3.5 border-b border-white/20 pb-2.5 text-xl text-white">Tentang Kami</h2>
              <p className="text-[15px]">
                TaniMart adalah platform belanja daring yang menghubungkan petani dengan pembeli. Kami
                berupaya memberi keuntungan terbaik bagi petani sekaligus menghadirkan pengalaman belanja
                yang lebih baik bagi konsumen.
              </p>
            </div>
            <div id="contact-us">
              <h2 className="mb-3.5 border-b border-white/20 pb-2.5 text-xl text-white">Kontak</h2>
              <p className="mb-2 flex items-center gap-2 text-[15px]"><MapPin size={16} className="text-marigold" /> Gowa, Sulawesi Selatan</p>
              <p className="mb-2 flex items-center gap-2 text-[15px]"><Mail size={16} className="text-marigold" /> tanimart@gmail.com</p>
              <p className="mb-2 flex items-center gap-2 text-[15px]"><Phone size={16} className="text-marigold" /> +6285276897654</p>
              <p className="text-[15px]">
                <Link href="/feedback" className="flex items-center gap-2 hover:text-marigold">
                  <MessageSquare size={16} className="text-marigold" /> Kirim masukan
                </Link>
              </p>
            </div>
            <div>
              <h2 className="mb-3.5 border-b border-white/20 pb-2.5 text-xl text-white">Hubungi Kami</h2>
              <div className="flex gap-2.5">
                {[
                  ["Facebook", "f", "https://www.facebook.com/"],
                  ["Twitter", "x", "https://twitter.com/"],
                  ["Instagram", "ig", "https://www.instagram.com/"],
                ].map(([label, short, href]) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-[42px] place-items-center rounded-full border-[1.5px] border-white/30 text-sm font-bold transition hover:border-marigold hover:bg-marigold hover:text-forest"
                  >
                    {short}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-10 border-t border-white/20 pt-5 text-center text-sm">
            © TaniMart, hanya proyek model!
          </p>
        </div>
      </footer>
    </>
  );
}
