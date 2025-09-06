"use client";
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import './globals.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <Link href="/" className="text-xl font-bold text-blue-600">Learning Mind Map</Link>
        <Link href="/user" className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded">
          <span className="inline-block w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">
            {user.user?.email?.[0]?.toUpperCase() || 'U'}
          </span>
          <span className="hidden md:inline text-gray-700">{user.user?.email || 'User'}</span>
        </Link>
      </header>
      <main className="flex-1 max-w-7xl mx-auto p-4 w-full">{children}</main>
      <footer className="bg-white border-t py-4 px-6 text-center text-gray-500 text-sm">
        <div>
          &copy; {new Date().getFullYear()} Learning Mind Map &mdash; <Link href="/">Home</Link> | <Link href="/user">User</Link>
        </div>
      </footer>
    </div>
  );
}
