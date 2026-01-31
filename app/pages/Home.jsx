import React from 'react';
// Updated import path to match your folder structure in Screenshot 4
import SearchBar from '../components/home/SearchBar'; 

export default function Home() {
  return (
    <div className="flex-grow flex items-center justify-center p-4 min-h-[60vh]">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Find the Owner. Know the Property.
        </h1>
        <p className="text-lg text-gray-500 mb-10">
          Search millions of records to map property ownership.
        </p>
        <SearchBar />
      </div>
    </div>
  );
}