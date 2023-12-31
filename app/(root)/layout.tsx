
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "../globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Leftsidebar from "@/components/shared/Leftsidebar";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Bottombar from "@/components/shared/Bottombar";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title :"Dove",
  description : "A Next.Js 13 Metadata Dove Application"
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="flex flex-row">
            <Leftsidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>
            <Rightsidebar />
          </main>
          <Bottombar />
        </body>
      </html>

    </ClerkProvider>
  )
}
