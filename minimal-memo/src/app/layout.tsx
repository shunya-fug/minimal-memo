import type { Metadata } from "next";
import { Noto_Sans_JP, Inconsolata } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { auth } from "@/common/auth";
import { NavigationBar } from "@/components/NavigationBar";
import { SideMenuBar } from "@/components/SideMenuBar";

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
          <NavigationBar />
          <div className="flex">
            <SideMenuBar />
            {children}
          </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}
