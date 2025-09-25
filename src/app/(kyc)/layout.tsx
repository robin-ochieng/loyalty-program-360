import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function KycLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <aside className="hidden lg:block border-r bg-white border-gray-200 w-[280px] shrink-0">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4 lg:p-6">{children}</main>
    </div>
  );
}
