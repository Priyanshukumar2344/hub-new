import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { NavBar } from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AITD Student Resource Hub",
  description: "Upload and access notes and assignments for BTECH students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main>{children}</main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

