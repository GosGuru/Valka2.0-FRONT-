import type { Metadata } from "next";
import "./globals.css"; // Importa los estilos globales
import Header from "./components/header"; // Ajusta la ruta según tu estructura
import NavBar from "./components/NavBarMovil"; // Ajusta la ruta según tu estructura
import { AuthProvider } from "./context/authContext";
import { robotoSlab } from "./ui/fonts";
import { Exo2 } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer"; // Importa el Footer
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "Valka",
  description:
    "En valka te ayudamos no solo a conseguir tu fisico soñado, sino también a vivir mejor",
  icons: {
    icon: "/Favicon.ico",
  },
};

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function RootLayout({ children, hideFooter }: LayoutProps) {
  return (
    <html lang="en" className={Exo2.variable} suppressHydrationWarning>
      <body
        className={`${robotoSlab.className} antialiased bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen">
              {children}

            </main>
              <NavBar />
            <Toaster />
            {!hideFooter && <Footer />}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
