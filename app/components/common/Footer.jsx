import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 p-6 text-center text-sm text-gray-500 mt-auto">
      &copy; {new Date().getFullYear()} Landlord Mapper. All rights reserved.
    </footer>
  );
}