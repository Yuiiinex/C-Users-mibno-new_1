// Root layout - pass through, actual layout is in [locale]/layout.tsx
// Middleware handles locale routing
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

