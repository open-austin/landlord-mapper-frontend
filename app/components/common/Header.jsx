import React, { useState } from 'react';
import { MapPin, Menu } from 'lucide-react';
import { Link } from 'react-router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['About', 'Data Sources', 'Contact'];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <MapPin className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-extrabold text-blue-700 tracking-wider">
            Landlord Mapper
          </span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">About</Link>
          <span className="text-gray-400 cursor-not-allowed">Data Sources</span>
          <span className="text-gray-400 cursor-not-allowed">Contact</span>
        </nav>

        <button 
          className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Link to="/about" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50">About</Link>
        </div>
      )}
    </header>
  );
}