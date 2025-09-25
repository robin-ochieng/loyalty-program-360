'use client';

import Link from 'next/link';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export type SidebarProduct = {
  id: string;
  name: string;
  slug: string; // for links like /kyc?product=slug
  category: 'Core' | 'Optional';
};

export type KycSidebarProps = {
  selected: string[]; // product ids
  onToggle: (productId: string) => void;
};

const CORE: SidebarProduct[] = [
  { id: '1', name: 'Motor Insurance', slug: 'motor', category: 'Core' },
  { id: '2', name: 'Medical Insurance', slug: 'medical', category: 'Core' },
  { id: '3', name: 'Home Insurance', slug: 'home', category: 'Core' },
  { id: '4', name: 'Pension (KIPF)', slug: 'kipf', category: 'Core' },
  { id: '5', name: 'Wekapesa', slug: 'wekapesa', category: 'Core' },
];

const OPTIONAL: SidebarProduct[] = [
  { id: '6', name: 'Travel Insurance', slug: 'travel', category: 'Optional' },
  { id: '7', name: 'Personal Accident', slug: 'pa', category: 'Optional' },
  { id: '8', name: 'Pet Insurance', slug: 'pet', category: 'Optional' },
  { id: '9', name: 'Income Protection', slug: 'income', category: 'Optional' },
  { id: '10', name: 'Home Office Insurance', slug: 'home-office', category: 'Optional' },
];

export default function KycSidebar({ selected, onToggle }: KycSidebarProps) {
  const Tier = () => {
    const count = selected.length;
    const tier = count >= 5 ? 'Platinum' : count >= 3 ? 'Gold' : count === 2 ? 'Silver' : 'Bronze';
    const next =
      count >= 5 ? 'Maximum benefits unlocked!' : `${5 - count} more product(s) to reach Platinum`;
    return (
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold text-indigo-800 mb-2">Your Tier Status:</h4>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">{tier}</span>
          <span className="text-sm text-indigo-600">{next}</span>
        </div>
      </div>
    );
  };

  const Group = ({ title, items }: { title: string; items: SidebarProduct[] }) => (
    <div>
      <div className="px-2 pb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </div>
      <ul className="px-2 space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className={`w-full text-left rounded-md px-2 py-1.5 transition-colors border-2 ${
                selected.includes(item.id)
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                {selected.includes(item.id) && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <aside className="hidden lg:block border-r bg-white border-gray-200 w-[300px] shrink-0 p-4">
      <nav className="h-full space-y-6 text-gray-700">
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
                Home
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
          </ul>
        </div>

        <Group title="Core" items={CORE} />
        <Group title="Optional" items={OPTIONAL} />

        <Tier />
      </nav>
    </aside>
  );
}
