import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer, Flip } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3301 | Cryptic Hunt',
  description: "Delta's Cryptic Hunt",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='dark' lang="en">
      <ToastContainer transition={Flip} />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
