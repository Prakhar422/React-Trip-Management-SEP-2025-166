import type React from "react"
import "../src/index.css"
import "../src/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Trip Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
