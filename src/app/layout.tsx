import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Elhawy Freight - Logistics OS",
  description: "Advanced Freight Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased bg-gray-50`}
      >
        <ClientProviders>
          {children}
          <Toaster position="top-center" richColors />
        </ClientProviders>
      </body>
    </html>
  );
}
