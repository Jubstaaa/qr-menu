import * as React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} QRMenu. Tüm hakları saklıdır.
      </div>
    </footer>
  );
} 