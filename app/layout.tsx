import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EnquiryProviderWrapper } from "@/components/enquiry-provider-wrapper"
import { DashboardProvider } from "@/lib/dashboard-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Madura Global | Premium Tours & Destinations Worldwide",
  description:
    "Discover extraordinary travel experiences with Madura Global. Explore curated tour packages to stunning destinations worldwide. Book your dream vacation today.",
  keywords: "travel, tourism, tours, destinations, vacation packages, luxury travel, honeymoon, MICE",
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <DashboardProvider>
          <EnquiryProviderWrapper>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </EnquiryProviderWrapper>
        </DashboardProvider>
        <Analytics />
      </body>
    </html>
  )
}
