import type { Metadata } from "next";
import { Noto_Sans_JP, Inconsolata } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { auth } from "@/util/auth";

const inter = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minimal Memo",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="ja" data-theme="dracula">
      <body className={inter.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
