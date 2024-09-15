// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Next.js MySQL CRUD',
  description: 'A simple Next.js CRUD app with MySQL',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
