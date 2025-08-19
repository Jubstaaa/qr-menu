import * as React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  brand?: string;
  items?: NavItem[];
  cta?: { label: string; href: string };
}

export function Navbar({ brand = 'QRMenu', items = [], cta }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="/" className="text-lg font-semibold tracking-tight text-gray-900">
          {brand}
        </a>
        <nav className="hidden gap-6 md:flex">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {cta && (
            <a
              href={cta.href}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
} 