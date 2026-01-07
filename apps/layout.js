import './globals.css'

export const metadata = {
  title: 'PRE-DICKTOR',
  description: 'The Ultimate Solana Prediction Market',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
