import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router'; // Use React Router hook

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the results page with the search term in the URL
    navigate(`/results?q=${encodeURIComponent(term)}`);
  };

 /* return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full">
      <div className="relative flex-grow w-full">
        <input
          type="text"
          placeholder="Enter address..."
          className="w-full h-12 pl-12 pr-4 border-2 border-blue-200 rounded-lg shadow-lg focus:ring-4 focus:ring-blue-300 outline-none"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      </div>
      <button type="submit" className="w-full sm:w-auto h-12 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
        <Search className="w-4 h-4 mr-2 inline" /> Search
      </button>
    </form>
  );
}
*/
  return (
    <form 
      onSubmit={handleSearch} 
      className="flex flex-col sm:flex-row items-center gap-4 w-full"
    >
      {/* Input Field */}
      <div className="relative flex-grow w-full">
        <input
          type="text"
          placeholder="Enter address..."
          className="w-full h-12 pl-12 pr-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition duration-200 text-base"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      </div>
      
      {/* FIXED BUTTON STYLES:
        - flex items-center justify-center: Aligns icon and text horizontally
        - gap-2: Adds space between icon and text
        - h-12: Matches input height
        - rounded-xl: Gives it that modern "pill" look
      */}
      <button
        type="submit"
        className="w-full sm:w-auto h-12 px-8 bg-blue-600 text-white font-semibold text-base rounded-xl shadow-md hover:bg-blue-700 transition duration-150 flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </button>
    </form>
  );
}