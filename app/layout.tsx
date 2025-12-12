export const metadata = {
  title: '3D Mechanical Watch Mechanism',
  description: 'Interactive 3D mechanical watch with detailed mechanism inspection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
