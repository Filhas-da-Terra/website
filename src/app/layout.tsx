import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Header from './components/header'
import Footer from './components/footer'
import BackToTop from './components/backToTop'
import { ThemeProvider } from './providers/theme-provider'

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
          <main className='flex-grow'>{children}</main>
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
