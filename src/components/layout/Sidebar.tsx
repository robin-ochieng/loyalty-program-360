import Link from 'next/link';
import React from 'react';

type NavItem = { label: string; href: string };

const core: NavItem[] = [
  { label: 'Motor', href: '/kyc?product=motor' },
  { label: 'Medical', href: '/kyc?product=medical' },
  { label: 'Home', href: '/kyc?product=home' },
  { label: 'Pension (KIPF)', href: '/kyc?product=kipf' },
  { label: 'Wekapesa', href: '/kyc?product=wekapesa' },
];

const optional: NavItem[] = [
  { label: 'Travel', href: '/kyc?product=travel' },
  { label: 'Personal Accident', href: '/kyc?product=pa' },
  { label: 'Pet Insurance', href: '/kyc?product=pet' },
  { label: 'Income Protection', href: '/kyc?product=income' },
  { label: 'Home Office', href: '/kyc?product=home-office' },
];

export default function Sidebar() {
  return (
    <nav className="h-full p-4 space-y-6 bg-white text-gray-700">
      <div>
        <div className="px-2 pb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
          Main
        </div>
        <ul className="px-2 space-y-1">
          <li>
            <Link
              className="block rounded-md px-2 py-1.5 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
              href="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="block rounded-md px-2 py-1.5 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
              href="/kyc"
            >
              KYC
            </Link>
          </li>
          <li>
            <Link
              className="block rounded-md px-2 py-1.5 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
              href="#"
            >
              Loyalty
            </Link>
          </li>
          <li>
            <Link
              className="block rounded-md px-2 py-1.5 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
              href="#"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="px-2 pb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
          Core
        </div>
        <ul className="px-2 space-y-1">
          {core.map((item) => (
            <li key={item.href}>
              <Link
                className="block rounded-md px-2 py-1.5 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="px-2 pb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
          Optional
        </div>
        <ul className="px-2 space-y-1">
          {optional.map((item) => (
            <li key={item.href}>
              <Link
                className="block rounded-md px-2 py-1.5 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
