
import { Inter } from "next/font/google"
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata ={
    title :"Dove",
    description : "A Next.Js 13 Metadata Dove Application"
}

const inter = Inter({subsets: ["latin"]})


export default function RootLayout(
    {
        children
    }:{
        children:React.ReactNode
    }){
        return (
            <ClerkProvider>
                <html lang="en">
                    <body className={`${inter.className} bg-dark-1`}>
                        <div className="w-full h-full flex items-center justify-center bg-dark-1">
                            {children}
                        </div>
                    </body>
                </html>
            </ClerkProvider> 
        )
    }