import { supabase } from '../lib/supabase';

const PARCELS_JSON_URL = 'https://kuuvyfrchzsodnqitchn.supabase.co/storage/v1/object/public/Parcels/parcels.json';

/**
 * Main search function
 */
export async function searchPropertyData(query) {
  if (!query) return null;
  const normalizedQuery = query.toLowerCase().trim();

  try {
    // 1. Try API Search first
    const { data: ownerData } = await supabase
      .from('owners') 
      .select('*')
      .ilike('address', `%${query}%`)
      .limit(1);

    if (ownerData && ownerData.length > 0) {
      return transformToUiModel(ownerData[0], 'API');
    }

    // 2. Fetch the Parcels JSON file
    const response = await fetch(PARCELS_JSON_URL);
    if (!response.ok) throw new Error('Failed to fetch Parcels feed');
    
    const allParcels = await response.json();
    
    // Search logic: Check Situs Address OR Owner Mailing Address
    const foundParcel = allParcels.find(p => {
      const situsAddress = (p.situs_address || '').toLowerCase();
      if (situsAddress.includes(normalizedQuery)) return true;

      if (Array.isArray(p.title_holders)) {
        return p.title_holders.some(holder => 
          (holder.mailing_address || '').toLowerCase().includes(normalizedQuery)
        );
      }
      return false;
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
  // Normalize Address
  let address = data.address || data.property_address;
  if (source === 'JSON') address = data.situs_address;

  // Normalize Owner Name: Prefer scraped name, then API name, then title holders
  let owner = data.owner_name_scraped || data.owner_name || data.name;
  if (source === 'JSON' && !owner && data.title_holders && data.title_holders.length > 0) {
    owner = data.title_holders[0].name;
  }

  return {
    address: address || "Address Unknown",
    viabilityScore: data.viability_score || 75,
    viabilityLabel: "Calculated from Data",
    
    ownership: {
      owner: owner || "Unknown Owner",
      ownerNum: data.Owner_num || "N/A", // New field
      recentPurchase: data.Recent_purchase_date || "N/A", // New field
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
      units: data.property_units || data.units || "N/A", // New field
      yearBuilt: data.propertyProf_YearBuilt || data.YearBuilt || "N/A", // New field
      totalArea: data.propertyProf_imprvTotalArea ? `${data.propertyProf_imprvTotalArea} sqft` : "N/A", // New field
      zoning: data.propertyProf_zoning || data.zoning || "Residential",
      taxCode: data.propertyProf_state_tax_code || "N/A", // New field
      codeComplaints: data.code_complaints || data.violation_count || "None Reported", // Updated mapping
      inspectionResults: data.inspection_status || "Pending",
    },

    socioEconomic: {
      hhiRank: data.HHI_rank ? `${(data.HHI_rank * 100).toFixed(1)}%` : "N/A", // Assuming rank is decimal, formatting as %
      rplThemes: data.rpl_themes || "N/A",
    },
    
    organizing: {
      contacts: "0 leads in CRM",
      affinities: "None listed",
    },
  };
}
/*export async function searchPropertyData(query) {
  if (!query) return null;
  const normalizedQuery = query.toLowerCase().trim();

  try {
    // 1. Try API Search first
    // UPDATED: Removed 'name.ilike' to limit search to address fields only.
    const { data: ownerData } = await supabase
      .from('owners') 
      .select('*')
      .ilike('address', `%${query}%`) // Only search the address column
      .limit(1);

    if (ownerData && ownerData.length > 0) {
      return transformToUiModel(ownerData[0], 'API');
    }

    // 2. Fetch the Parcels JSON file
    const response = await fetch(PARCELS_JSON_URL);
    if (!response.ok) throw new Error('Failed to fetch Parcels feed');
    
    const allParcels = await response.json();
    
    // UPDATED: Search logic now restricted to Addresses (Situs OR Owner Mailing)
    const foundParcel = allParcels.find(p => {
      // 1. Check Property Address (Situs)
      const situsAddress = (p.situs_address || '').toLowerCase();
      if (situsAddress.includes(normalizedQuery)) return true;

      // 2. Check Owner Mailing Address (inside title_holders)
      if (Array.isArray(p.title_holders)) {
        return p.title_holders.some(holder => 
          (holder.mailing_address || '').toLowerCase().includes(normalizedQuery)
        );
      }
      
      return false;
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
}*
/*export async function searchPropertyData(query) {
  if (!query) return null;
  const normalizedQuery = query.toLowerCase();

  try {
    
    const { data: ownerData } = await supabase
      .from('owners') 
      .select('*')
      .or(`name.ilike.%${query}%,address.ilike.%${query}%`)
      .limit(1);

    if (ownerData && ownerData.length > 0) {
      return transformToUiModel(ownerData[0], 'API');
    }

   
    const response = await fetch(PARCELS_JSON_URL);
    if (!response.ok) throw new Error('Failed to fetch Parcels feed');
    
    const allParcels = await response.json();
    
    
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
}*/

