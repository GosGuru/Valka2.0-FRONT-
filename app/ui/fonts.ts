import { Weight } from "lucide-react";
import {
  Bebas_Neue,
  Roboto_Slab,
  Open_Sans,
  Exo_2,
  Zain,
  Lexend_Deca,
} from "next/font/google";

export const bebasNeue = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-Bebas_Neue",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin", "cyrillic"],
  weight: "600",
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

export const zain = Zain({
  subsets: ["latin"],
  weight: "400", // Solo incluye los pesos compatibles para esta fuente
  variable: "--font-Zain",
});

export const lexendDeca = Lexend_Deca({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"], // Incluye los pesos compatibles para esta fuente
  variable: "--font-Lexend_Deca",
});
