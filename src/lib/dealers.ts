import Papa from 'papaparse';

export interface Dealer {
  name: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  facebookUrl?: string;
  email?: string;
  threeDBuilderUrl?: string;
  latitude?: number;
  longitude?: number;
}

// Arkansas city coordinates (approximate)
const ARKANSAS_CITIES: { [key: string]: { lat: number; lng: number } } = {
  'Little Rock': { lat: 34.7465, lng: -92.2896 },
  'Fort Smith': { lat: 35.3859, lng: -94.3985 },
  'Fayetteville': { lat: 36.0822, lng: -94.1719 },
  'Springdale': { lat: 36.1867, lng: -94.1288 },
  'Jonesboro': { lat: 35.8423, lng: -90.7043 },
  'Conway': { lat: 35.0887, lng: -92.4421 },
  'Rogers': { lat: 36.3320, lng: -94.1185 },
  'Bentonville': { lat: 36.3729, lng: -94.2088 },
  'Pine Bluff': { lat: 34.2284, lng: -92.0032 },
  'Hot Springs': { lat: 34.5037, lng: -93.0552 },
  'North Little Rock': { lat: 34.7695, lng: -92.2671 },
  'Benton': { lat: 34.5698, lng: -92.5854 },
  'Searcy': { lat: 35.2506, lng: -91.7362 },
  'Russellville': { lat: 35.2784, lng: -93.1338 },
  'Bella Vista': { lat: 36.4815, lng: -94.2733 },
  'Paragould': { lat: 36.0584, lng: -90.4973 },
  'Jacksonville': { lat: 34.8662, lng: -92.1101 },
  'West Memphis': { lat: 35.1465, lng: -90.1845 },
  'Texarkana': { lat: 33.4417, lng: -94.0376 },
  'Sherwood': { lat: 34.8151, lng: -92.2243 },
  'Cabot': { lat: 34.9745, lng: -92.0165 },
  'Bryant': { lat: 34.5957, lng: -92.4891 },
  'Van Buren': { lat: 35.4368, lng: -94.3483 },
  'El Dorado': { lat: 33.2076, lng: -92.6663 },
  'Maumelle': { lat: 34.8668, lng: -92.4043 },
  'Siloam Springs': { lat: 36.1881, lng: -94.5405 },
  'Magnolia': { lat: 33.2671, lng: -93.2393 },
  'Arkadelphia': { lat: 34.1209, lng: -93.0538 },
  'Camden': { lat: 33.5846, lng: -92.8343 },
  'Hope': { lat: 33.6671, lng: -93.5916 },
  'Harrison': { lat: 36.2298, lng: -93.1077 },
  'Mountain Home': { lat: 36.3354, lng: -92.3852 },
  'Batesville': { lat: 35.7698, lng: -91.6409 },
  'Stuttgart': { lat: 34.5004, lng: -91.5526 },
  'Forrest City': { lat: 35.0081, lng: -90.7898 },
  'Wynne': { lat: 35.2245, lng: -90.7868 },
  'Heber Spring': { lat: 35.4917, lng: -92.0313 },
  'Clarksville': { lat: 35.4715, lng: -93.4666 },
  'Morrilton': { lat: 35.1509, lng: -92.7441 },
  'Ashdown': { lat: 33.6737, lng: -94.1313 },
  'Dumas': { lat: 33.8865, lng: -91.4918 },
  'Monticello': { lat: 33.6293, lng: -91.7909 },
  'Malvern': { lat: 34.3634, lng: -92.8129 },
  'Crossett': { lat: 33.1282, lng: -91.9612 },
  'Osceola': { lat: 35.7051, lng: -89.9695 },
  'Newport': { lat: 35.6076, lng: -91.2818 },
  'Pocahontas': { lat: 36.2615, lng: -90.9712 },
  'Mena': { lat: 34.5862, lng: -94.2397 },
  'De Queen': { lat: 34.0379, lng: -94.3413 },
  'Trumann': { lat: 35.6737, lng: -90.5073 },
  'Berryville': { lat: 36.3648, lng: -93.5679 },
  'Greenbrier': { lat: 35.2340, lng: -92.3874 },
  'Lonoke': { lat: 34.7839, lng: -91.9007 },
  'Pea Ridge': { lat: 36.4539, lng: -94.1149 },
  'Gentry': { lat: 36.2676, lng: -94.4844 },
  'Lake Village': { lat: 33.3287, lng: -91.2818 },
  'Star City': { lat: 33.9423, lng: -91.8432 },
  'Waldron': { lat: 34.8984, lng: -94.0916 },
  'Cave City': { lat: 35.9417, lng: -91.5485 },
  'Manila': { lat: 35.8801, lng: -90.1673 },
  'Atkins': { lat: 35.2412, lng: -92.9366 },
  // Add more cities as needed
};

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Parse CSV data
export function parseDealers(csvData: string): Dealer[] {
  const results = Papa.parse(csvData, { header: true });
  
  return results.data.map((row: unknown) => {
    const rowData = row as Record<string, string>;
    const city = rowData['Shipping City'] || '';
    const cityCoords = ARKANSAS_CITIES[city];
    
    return {
      name: rowData['Website Disp'] || '',
      phone: rowData['Phone'] || '',
      website: rowData['Website'] || '',
      address: rowData['Shipping Stre'] || '',
      city: city,
      state: rowData['Shipping Stat'] || '',
      zip: rowData['Shipping Zip/'] || '',
      facebookUrl: rowData['Facebook Url'] || '',
      email: rowData['Email Addres'] || '',
      threeDBuilderUrl: rowData['3D Builder Si'] || '',
      latitude: cityCoords?.lat,
      longitude: cityCoords?.lng,
    };
  }).filter(dealer => dealer.name && dealer.city);
}

// Find closest dealer to a given city
export function findClosestDealer(city: string, dealers: Dealer[]): Dealer | null {
  const cityCoords = ARKANSAS_CITIES[city];
  if (!cityCoords) return null;

  let closestDealer: Dealer | null = null;
  let minDistance = Infinity;

  dealers.forEach(dealer => {
    if (dealer.latitude && dealer.longitude) {
      const distance = calculateDistance(
        cityCoords.lat, cityCoords.lng,
        dealer.latitude, dealer.longitude
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestDealer = dealer;
      }
    }
  });

  return closestDealer;
}

// Get all unique cities from dealers
export function getUniqueCities(dealers: Dealer[]): string[] {
  const cities = dealers.map(dealer => dealer.city);
  return [...new Set(cities)].sort();
}

// Get all major Arkansas cities (for SEO pages)
export function getMajorArkansasCities(): string[] {
  return Object.keys(ARKANSAS_CITIES).sort();
}

// Get dealers in a specific city
export function getDealersInCity(city: string, dealers: Dealer[]): Dealer[] {
  return dealers.filter(dealer => 
    dealer.city.toLowerCase() === city.toLowerCase()
  );
} 