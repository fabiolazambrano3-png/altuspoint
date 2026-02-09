import type { ReactNode } from 'react';

// This root layout simply renders children.
// The actual layout with providers is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
