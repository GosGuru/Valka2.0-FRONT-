import { Weight } from "lucide-react";
import { Bebas_Neue, Roboto_Slab, Open_Sans, Exo_2 } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-Bebas_Neue",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-Roboto_Slab",
});

export const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-Open_Sans",
});
export const Exo2 = Exo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-Exo_2",
});
