'use client';
import React, { useEffect, useState } from 'react';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then((resp: { data: { user: { email?: string } | null } }) => {
      setUserEmail(resp.data.user?.email ?? null);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push('/auth?mode=signin');
  };

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="size-5" />
          </Button>
          <div className="shrink-0">
            <Link href="/" aria-label="Go to Home">
              <Image
                src="/Kenbright 360 Logo.png"
                alt="Kenbright360 Logo"
                width={140}
                height={40}
                priority
                className="h-8 w-auto sm:h-9"
              />
            </Link>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Link href="/" className="hidden sm:inline text-sm text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link href="/kyc" aria-label="Go to KYC page">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">KYC</Button>
          </Link>
          {loading ? null : userEmail ? (
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition"
                aria-haspopup="menu"
              >
                <UserIcon className="w-4 h-4 text-indigo-600" />
                <span className="max-w-[140px] truncate text-sm text-gray-700">{userEmail}</span>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 p-2 z-50">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
