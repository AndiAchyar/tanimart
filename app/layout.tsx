import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "TaniMart",
  description: "Belanja hasil tani segar langsung dari petani.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${bricolage.variable} ${nunito.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
