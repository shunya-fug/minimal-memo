import type { Metadata } from "next";
import { Noto_Sans_JP, Inconsolata } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { auth } from "@/util/auth";
import AuthButton from "@/components/AuthButton";

const inter = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minimal Memo",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="ja" data-theme="dracula">
      <NextAuthProvider session={session}>
        <body className={inter.className}>
          <header>
            <nav className="navbar bg-neutral">
              <div className="navbar-start"></div>
              <div className="navbar-center">
                <h1 className="text-4xl">Minimal Memo</h1>
              </div>
              <div className="navbar-end">
                <AuthButton />
              </div>
            </nav>
          </header>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
