'use client';
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Topbar() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="size-5" />
          </Button>
          <span className="font-semibold tracking-tight">Kenbright360</span>
        </div>
        <div className="text-sm text-muted-foreground">Loyalty / KYC</div>
      </div>
    </header>
  );
}
