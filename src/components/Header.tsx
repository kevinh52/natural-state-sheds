'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header-gradient text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logo.svg"
              alt="Natural State Sheds Logo"
              width={80}
              height={60}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold">Natural State Sheds</h1>
              <p className="text-sm opacity-90">Portable Buildings & Sheds</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-light-blue transition-colors">
              Home
            </Link>
            <Link href="/locations" className="hover:text-light-blue transition-colors">
              Locations
            </Link>
            <Link href="/about" className="hover:text-light-blue transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-light-blue transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 