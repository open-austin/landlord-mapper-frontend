import { supabase } from '../lib/supabase';

const PARCELS_JSON_URL = 'https://kuuvyfrchzsodnqitchn.supabase.co/storage/v1/object/public/Parcels/parcels.json';

/**
 * Main search function
 */
export async function searchPropertyData(query) {
  if (!query) return null;
  const normalizedQuery = query.toLowerCase();

  try {
    // 1. Try API Search first
    const { data: ownerData } = await supabase
      .from('owners') 
      .select('*')
      .or(`name.ilike.%${query}%,address.ilike.%${query}%`)
      .limit(1);

    if (ownerData && ownerData.length > 0) {
      return transformToUiModel(ownerData[0], 'API');
    }

    // 2. Fetch the Parcels JSON file
    const response = await fetch(PARCELS_JSON_URL);
    if (!response.ok) throw new Error('Failed to fetch Parcels feed');
    
    const allParcels = await response.json();
    
    // FIX: Updated filtering to match your JSON structure (situs_address, title_holders)
    const foundParcel = allParcels.find(p => {
      const address = p.situs_address || '';
      // Check the first title holder if it exists
      const ownerName = p.title_holders && p.title_holders.length > 0 
        ? p.title_holders[0].name 
        : '';
      
      return address.toLowerCase().includes(normalizedQuery) ||
             ownerName.toLowerCase().includes(normalizedQuery);
    });

    if (foundParcel) {
      return transformToUiModel(foundParcel, 'JSON');
    }

    return null;

  } catch (error) {
    console.error("Search failed:", error);
    return null;
  }
}

function transformToUiModel(data, source) {
  // Normalize fields based on source
  let address = data.address || data.property_address;
  let owner = data.owner_name || data.name;

  // Specific mapping for the JSON file structure
  if (source === 'JSON') {
    address = data.situs_address;
    if (data.title_holders && data.title_holders.length > 0) {
      owner = data.title_holders[0].name;
    }
  }

  return {
    address: address || "Address Unknown",
    viabilityScore: data.viability_score || 75,
    viabilityLabel: "Calculated from Data",
    ownership: {
      owner: owner || "Unknown Owner",
      management: data.management_company || "Not Listed",
      financials: data.financial_notes || `Source: ${source}`,
    },
    tenantRisk: {
      evictions: data.eviction_count ? `${data.eviction_count} filings` : "No recent filings found",
      retaliationRisk: data.risk_level || "Low",
      lawsuits: data.has_lawsuits ? "Yes - Active Records" : "None found",
      rentIncreases: data.rent_increase_avg || "Data Unavailable",
    },
    conditions: {
      codeViolations: data.violation_count ? `${data.violation_count} Open` : "None Reported",
      inspectionResults: data.inspection_status || "Pending",
      reviews: "Data Unavailable",
      zoning: data.zoning || "Residential",
      buildingSize: data.units ? `${data.units} Units` : "Single Family",
    },
    organizing: {
      contacts: "0 leads in CRM",
      affinities: "None listed",
    },
  };
}