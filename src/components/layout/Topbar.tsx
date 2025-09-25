'use client';
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Topbar() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="size-5" />
          </Button>
          <div className="shrink-0">
            <Image
              src="/Kenbright 360 Logo.png"
              alt="Kenbright360 Logo"
              width={140}
              height={40}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Link href="/" className="hidden sm:inline text-sm text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link
            href="/auth?mode=signin"
            className="hidden sm:inline text-sm text-gray-700 hover:text-indigo-600"
          >
            Sign In
          </Link>
          <Link
            href="/auth?mode=signup"
            className="hidden sm:inline text-sm text-gray-700 hover:text-indigo-600"
          >
            Sign Up
          </Link>
          <Link href="/kyc" aria-label="Go to KYC page">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">KYC</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
