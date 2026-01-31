import React from 'react';

export default function InfoRow({ label, children, className = "" }) {
  return (
    <div className={`flex flex-row justify-between items-center py-4 border-b border-gray-100 last:border-0 ${className}`}>
      <div className="text-gray-900 font-medium text-lg text-left flex-1 mr-4">
        {children}
      </div>
      <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide text-right w-1/3 min-w-[120px]">
        {label}
      </div>
    </div>
  );
}