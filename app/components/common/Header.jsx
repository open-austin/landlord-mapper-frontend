import React, { useState } from 'react';
import { NavLink } from 'react-router'; 
import { MapPin, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['About', 'Data Sources', 'Contact'];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Added lg:h-20 for a taller, more spacious header on large screens */}
        <div className="flex justify-between items-center h-16 lg:h-20 transition-all duration-200">
          
          {/* 1. Logo Section (Always Visible) */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink 
              to="/" 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Icon scales up on large screens */}
              <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600 transition-all duration-200" />
              {/* Text scales up on large screens */}
              <span className="text-xl lg:text-2xl font-extrabold text-blue-700 tracking-wider transition-all duration-200">
                Landlord Mapper
              </span>
            </NavLink>
          </div>

          {/* 2. Desktop Navigation (Hidden on Mobile, Visible on md+) */}
          {/* Added lg:space-x-12 for wider spacing on large screens */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12 transition-all duration-200">
            {navItems.map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className={({ isActive }) => 
                  /* Text size increases to text-base on large screens */
                  `text-sm lg:text-base font-medium transition duration-150 ease-in-out ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          {/* 3. Mobile Menu Button (Visible on Mobile, Hidden on md+) */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown (Conditional Render) */}
      <div 
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-gray-100 bg-white`} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase().replace(' ', '-')}`}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}