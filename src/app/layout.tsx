import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './providers/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/ui/header'
import BackToTop from '@/components/ui/backToTop'
import Footer from '@/components/ui/footer'
const urbanist = Urbanist({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Instituto Filhas da Terra',
  description: 'Instituto Filhas da Terra - Justiça Socioambiental',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body
        className={`${urbanist.className} antialiased flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className='flex-grow'>
            {children}
            <Analytics />
          </main>
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
