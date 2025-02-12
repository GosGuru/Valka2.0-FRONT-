// layout.tsx
import type { Metadata } from "next";
import "./globals.scss";
import Header from "./components/header"; // Ajusta la ruta según tu estructura
import Footer from "./components/FooterMovil"; // Ajusta la ruta según tu estructura
import { AuthProvider } from "./context/authContext";
import { robotoSlab } from "./ui/fonts";
import { Exo2 } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Valka",
  description:
    "En valka te ayudamos no solo a conseguir tu fisico soñado, sino también a vivir mejor",
  icons: {
    icon: "/Favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Exo2.variable} suppressHydrationWarning>
      <body
        className={`${robotoSlab.className} antialiased bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark`}
      >
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
