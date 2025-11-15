// app/layout.tsx - Root Layout für Next.js App
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App - Next.js + Prisma",
  description: "Eine moderne Todo-Anwendung mit Next.js, TypeScript und Prisma",
  keywords: ["Todo", "Next.js", "TypeScript", "Prisma", "PostgreSQL"],
  authors: [{ name: "Development Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="h-full bg-gray-900">
      <body className={`${inter.className} h-full antialiased bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
