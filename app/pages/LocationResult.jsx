import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { ArrowLeft, Home, Shield, AlertTriangle, FileText, Users, Loader2 } from 'lucide-react';
import InfoRow from '../components/InfoRow';
import { searchPropertyData } from '../services/landlordService';

export default function LocationResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!query) {
        setLoading(false);
        setError(true);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const result = await searchPropertyData(query);

        if (result) {
          setData(result);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Search failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p>Searching records for "{query}"...</p>
      </div>
    );
  }

  // Not Found State
  if (error || !data) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center">
        <button onClick={() => navigate('/')} className="mb-6 flex items-center text-gray-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
        </button>
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
          <p className="text-gray-500 mb-6">
            {query
              ? `We couldn't find any properties matching "${query}".`
              : "Enter an address to see results."}
          </p>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Try Another Search
          </button>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-gray-500 hover:text-blue-600 transition font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
      </button>

      {/* Top Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-start sm:items-center gap-2 break-words">
            <Home className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 mt-1 sm:mt-0" />
            <span>{data.address}</span>
          </h1>
          <div className="flex flex-wrap gap-2 mt-2 ml-1 text-sm text-gray-500">
            <span className="whitespace-nowrap">Zoning: {data.conditions.zoning}</span>
          </div>
        </div>
        
        {/* Score */}
        <div className="w-full md:w-auto bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4 min-w-[200px] justify-center md:justify-start">
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-blue-200" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-blue-600" strokeDasharray="175" strokeDashoffset={175 - (175 * data.viabilityScore) / 100} />
            </svg>
            <span className="absolute text-lg font-bold text-blue-700">{data.viabilityScore}</span>
          </div>
          <div>
            <div className="text-sm text-blue-600 font-semibold uppercase tracking-wide">Organizing Viability</div>
            <div className="text-lg font-bold text-gray-900">{data.viabilityLabel}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Ownership */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">Ownership & Legal</h2>
          </div>
          <div className="px-6 py-2">
            <InfoRow label="Property Owner">{data.ownership.owner}</InfoRow>
            <InfoRow label="Management Co.">{data.ownership.management}</InfoRow>
            <InfoRow label="Financials">{data.ownership.financials}</InfoRow>
          </div>
        </div>

        {/* Risk */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800">Tenant Risk</h2>
          </div>
          <div className="px-6 py-2">
            <InfoRow label="Eviction Filings">{data.tenantRisk.evictions}</InfoRow>
            <InfoRow label="Retaliation Risk">{data.tenantRisk.retaliationRisk}</InfoRow>
            <InfoRow label="Known Lawsuits">{data.tenantRisk.lawsuits}</InfoRow>
            <InfoRow label="Rent Increases">{data.tenantRisk.rentIncreases}</InfoRow>
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">Property Conditions</h2>
          </div>
          <div className="px-6 py-2">
            <InfoRow label="Building Size">{data.conditions.buildingSize}</InfoRow>
            <InfoRow label="Code Violations">{data.conditions.codeViolations}</InfoRow>
            <InfoRow label="Inspection">{data.conditions.inspectionResults}</InfoRow>
          </div>
        </div>

        {/* Organizing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 px-6 py-4 border-b border-blue-700 flex items-center gap-2">
            <Users className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Organizing Potential</h2>
          </div>
          <div className="px-6 py-4 space-y-4">
             <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-700">{data.organizing.contacts}</div>
                      <div className="text-xs text-blue-600 font-semibold uppercase">Existing Leads</div>
                    </div>
                    <Users className="w-6 h-6 text-blue-300" />
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
// import React from 'react';
// import { 
//   useSearchParams, 
//   useNavigate, 
//   useInRouterContext, 
//   MemoryRouter 
// } from 'react-router';
// import { 
//   ArrowLeft, Home, Shield, AlertTriangle, FileText, 
//   Users, Gavel, TrendingUp, XCircle, Search 
// } from 'lucide-react';

// // --- INTERNAL COMPONENT ---
// const InfoRow = ({ label, children, className = "" }) => (
//   <div className={`flex flex-row justify-between items-center py-4 border-b border-gray-100 last:border-0 ${className}`}>
//     <div className="text-gray-900 font-medium text-lg text-left flex-1 mr-4">
//       {children}
//     </div>
//     <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide text-right w-1/3 min-w-[120px]">
//       {label}
//     </div>
//   </div>
// );

// // --- MOCK DATA ---
// const mockPropertyData = {
//   address: "1234 Maple Avenue, Springfield, IL 62704",
//   viabilityScore: 85,
//   viabilityLabel: "High Potential",
//   ownership: {
//     owner: "Maple Holdings LLC",
//     management: "Prestige Property Mgmt",
//     financials: "High leverage detected; 2 mortgage filings in 2023.",
//   },
//   tenantRisk: {
//     evictions: "12 filings in past 5 years (Trending Up)",
//     retaliationRisk: "High",
//     lawsuits: "Yes - 2 active disputes",
//     rentIncreases: "Avg 15% increase YoY (2022-2024)",
//   },
//   conditions: {
//     codeViolations: "5 Open (2 Severe - Mold/Heat)",
//     inspectionResults: "Fail (Last inspection: Oct 2024)",
//     reviews: "2.1 Stars (Keywords: 'Leaks', 'No heat', 'Rude')",
//     zoning: "R-4 Multi-family Residential",
//     buildingSize: "24 Units",
//   },
//   organizing: {
//     contacts: "3 leads in CRM",
//     affinities: "Local Teachers Union members; FB Group 'Maple Tenants'",
//   },
// };

// // --- CONTENT COMPONENT ---
// // This contains the logic that requires Router context
// function LocationResultContent() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate(); 
  
//   const query = searchParams.get('q');
//   const data = mockPropertyData;

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate('/')}
//         className="mb-6 flex items-center text-gray-500 hover:text-blue-600 transition font-medium"
//       >
//         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
//       </button>

//       {/* Optional Search Query Display */}
//       {query && (
//         <div className="mb-4 text-sm text-gray-500 flex items-center">
//           <Search className="w-3 h-3 mr-1" />
//           Showing results for: <span className="font-semibold ml-1">"{query}"</span>
//         </div>
//       )}

//       {/* Top Bar: Address & Score */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//         <div className="w-full md:w-auto">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-start sm:items-center gap-2 break-words">
//             <Home className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 mt-1 sm:mt-0" />
//             <span>{data.address}</span>
//           </h1>
//           <div className="flex flex-wrap gap-2 mt-2 ml-1 text-sm text-gray-500">
//             <span className="whitespace-nowrap">Parcel ID: 09-21-300-004</span>
//             <span className="hidden sm:inline">•</span>
//             <span className="whitespace-nowrap">Zoning: {data.conditions.zoning}</span>
//           </div>
//         </div>
        
//         {/* Score Card */}
//         <div className="w-full md:w-auto bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4 min-w-[200px] justify-center md:justify-start">
//           <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
//             <svg className="w-full h-full transform -rotate-90">
//               <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-blue-200" />
//               <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-blue-600" strokeDasharray="175" strokeDashoffset={175 - (175 * data.viabilityScore) / 100} />
//             </svg>
//             <span className="absolute text-lg font-bold text-blue-700">{data.viabilityScore}</span>
//           </div>
//           <div>
//             <div className="text-sm text-blue-600 font-semibold uppercase tracking-wide">Organizing Viability</div>
//             <div className="text-lg font-bold text-gray-900">{data.viabilityLabel}</div>
//           </div>
//         </div>
//       </div>

//       {/* Single Column Stack Layout */}
//       <div className="flex flex-col gap-6">
        
//         {/* Card 1: Ownership and Legal */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
//             <Shield className="w-5 h-5 text-gray-500" />
//             <h2 className="text-lg font-semibold text-gray-800">Ownership & Legal</h2>
//           </div>
//           <div className="px-6 py-2">
//             <InfoRow label="Property Owner">
//               {data.ownership.owner}
//             </InfoRow>
//             <InfoRow label="Management Co.">
//               {data.ownership.management}
//             </InfoRow>
//             <InfoRow label="Financials">
//               <span className="inline-flex items-center gap-2 text-yellow-700 bg-yellow-50 px-3 py-1 rounded-md text-base">
//                 <TrendingUp className="w-4 h-4" />
//                 {data.ownership.financials}
//               </span>
//             </InfoRow>
//           </div>
//         </div>

//         {/* Card 2: Tenant Risk & Retaliation */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
//             <AlertTriangle className="w-5 h-5 text-orange-500" />
//             <h2 className="text-lg font-semibold text-gray-800">Tenant Risk & Retaliation</h2>
//           </div>
//           <div className="px-6 py-2">
//             <InfoRow label="Eviction Filings">
//               <span className="text-red-600">{data.tenantRisk.evictions}</span>
//             </InfoRow>
//             <InfoRow label="Retaliation Risk">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
//                 {data.tenantRisk.retaliationRisk}
//               </span>
//             </InfoRow>
//             <InfoRow label="Known Lawsuits">
//               <span className="flex items-center gap-2">
//                 <Gavel className="w-4 h-4 text-gray-400" />
//                 {data.tenantRisk.lawsuits}
//               </span>
//             </InfoRow>
//             <InfoRow label="Rent Increases">
//               {data.tenantRisk.rentIncreases}
//             </InfoRow>
//           </div>
//         </div>

//         {/* Card 3: Property Conditions */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
//             <FileText className="w-5 h-5 text-gray-500" />
//             <h2 className="text-lg font-semibold text-gray-800">Property Conditions</h2>
//           </div>
//           <div className="px-6 py-2">
//             <InfoRow label="Building Size">
//               {data.conditions.buildingSize}
//             </InfoRow>
//             <InfoRow label="Code Violations">
//               <span className="text-red-600">{data.conditions.codeViolations}</span>
//             </InfoRow>
//             <InfoRow label="Inspection">
//                <span className="flex items-center gap-2">
//                  <XCircle className="w-4 h-4 text-red-500" />
//                  {data.conditions.inspectionResults}
//                </span>
//             </InfoRow>
//             <InfoRow label="Reviews">
//               <span className="italic text-gray-600">"{data.conditions.reviews}"</span>
//             </InfoRow>
//           </div>
//         </div>

//         {/* Card 4: Organizing Potential */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="bg-blue-600 px-6 py-4 border-b border-blue-700 flex items-center gap-2">
//             <Users className="w-5 h-5 text-white" />
//             <h2 className="text-lg font-semibold text-white">Organizing Potential</h2>
//           </div>
//           <div className="px-6 py-4 space-y-4">
//              {/* Custom layout for organizing section */}
//              <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex-1 bg-blue-50 p-4 rounded-lg flex items-center justify-between">
//                     <div>
//                       <div className="text-2xl font-bold text-blue-700">{data.organizing.contacts}</div>
//                       <div className="text-xs text-blue-600 font-semibold uppercase">Existing Leads</div>
//                     </div>
//                     <Users className="w-6 h-6 text-blue-300" />
//                 </div>
//                 <div className="flex-[2] bg-gray-50 p-4 rounded-lg border border-gray-100">
//                     <div className="text-xs text-gray-500 font-semibold uppercase mb-2">Affinities</div>
//                     <div className="flex flex-wrap gap-2">
//                       {data.organizing.affinities.split(';').map((tag, idx) => (
//                         <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
//                           {tag.trim()}
//                         </span>
//                       ))}
//                     </div>
//                 </div>
//              </div>
//             <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition text-sm">
//               Start Organizing Campaign
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // --- MAIN EXPORT ---
// // Safely renders content whether in App or isolated Preview
// export default function LocationResult() {
//   let inRouterContext = false;
//   try {
//     inRouterContext = useInRouterContext();
//   } catch (e) {
//     inRouterContext = false;
//   }

//   if (inRouterContext) {
//     return <LocationResultContent />;
//   }

//   return (
//     <MemoryRouter initialEntries={['/results?q=preview']}>
//       <LocationResultContent />
//     </MemoryRouter>
//   );
// }
