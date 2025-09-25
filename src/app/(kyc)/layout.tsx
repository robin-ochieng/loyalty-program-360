import React from 'react';

export default function KycLayout({ children }: { children: React.ReactNode }) {
  // KYC route uses only the global Topbar; any KYC-specific sidebar is rendered by the page itself.
  return <main className="min-h-[calc(100vh-56px)]">{children}</main>;
}
