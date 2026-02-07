import React from 'react';
import { Database, FileSpreadsheet, ShieldAlert, ExternalLink } from 'lucide-react';

export default function DataSources() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Data Sources & Methodology
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Transparency is at the core of Landlord Mapper. Here is exactly where our data comes from and how we use it.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Source 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Parcels Database</h3>
          <p className="text-gray-600 mb-4">
            A comprehensive, denormalized registry of property parcels. This dataset includes physical addresses, geospatial coordinates, and linked title holders.
          </p>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Update Frequency:</span> Quarterly
          </div>
        </div>

        {/* Source 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Owners Registry</h3>
          <p className="text-gray-600 mb-4">
            Our proprietary database mapping LLCs and shell companies to actual human owners and management companies using public records.
          </p>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Source:</span> Public Records & User Submissions
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition md:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Data Accuracy</h3>
          <p className="text-gray-600 mb-4">
            While we strive for accuracy, property ownership data can change daily. Information provided here should be verified with official county records before taking legal action.
          </p>
          <a href="/contact" className="inline-flex items-center text-blue-600 hover:underline font-medium">
            Report an error <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

      </div>

      {/* Tech Stack Section */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Technology</h2>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p>
            Landlord Mapper aggregates data from multiple municipal and state-level feeds. 
            We use <strong>Supabase</strong> for real-time data storage and retrieval, ensuring that our "Parcels" and "Owners" APIs serve the most up-to-date information available.
          </p>
          <p className="mt-4">
            Data processing involves normalizing addresses (e.g., "St" to "Street") and cross-referencing mailing addresses to identify portfolio owners hiding behind separate LLCs.
          </p>
        </div>
      </div>
    </div>
  );
}