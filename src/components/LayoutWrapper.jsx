import React from 'react';
import { StatusBadge } from './StatusBadge';

/**
 * LayoutWrapper component for consistent page layout
 */
export function LayoutWrapper({ children, status, showStatus = true }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">
            Screen Share Test App
          </h1>
          {showStatus && <StatusBadge status={status} />}
        </div>
      </header>
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
          Works best in Chrome and Edge browsers
        </div>
      </footer>
    </div>
  );
}
