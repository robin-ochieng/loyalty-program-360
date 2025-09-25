import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Topbar from '@/components/layout/Topbar';
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
  title: 'Kenbright360',
  description: 'Kenbright360 Loyalty & KYC Platform',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-gray-50 text-gray-800`}
      >
        {/* Global top bar, no sidebar at root */}
        <Topbar />
        <main className="min-h-[calc(100vh-56px)] p-4 lg:p-6">{children}</main>
      </body>
    </html>
  );
}
