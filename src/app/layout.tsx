import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Topbar from '@/components/layout/Topbar';
import Sidebar from '@/components/layout/Sidebar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kenbright360 Loyalty/KYC',
  description: 'Kenbright360 platform (Loyalty & KYC)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <div className="min-h-screen grid grid-rows-[auto_1fr] grid-cols-1 lg:grid-cols-[280px_1fr]">
          <div className="lg:col-span-2">
            <Topbar />
          </div>
          <aside className="hidden lg:block border-r bg-card/50">
            <Sidebar />
          </aside>
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
