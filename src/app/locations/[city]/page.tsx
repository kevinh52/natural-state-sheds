import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMajorArkansasCities, findClosestDealer, getDealersInCity } from '@/lib/dealers';
import Header from '@/components/Header';
import DealerList from '@/components/DealerList';
import CityPageClient from './CityPageClient';
import Link from 'next/link';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

// Generate metadata for each city page
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `Sheds & Portable Buildings in ${cityName}, Arkansas | Natural State Sheds`,
    description: `Find quality sheds, portable buildings, cabins, barns, and tiny houses in ${cityName}, Arkansas. Local dealers with expert service and competitive prices.`,
    keywords: `sheds ${cityName}, portable buildings ${cityName}, cabins ${cityName}, barns ${cityName}, tiny houses ${cityName}, Arkansas, storage buildings, outdoor buildings`,
    openGraph: {
      title: `Sheds & Portable Buildings in ${cityName}, Arkansas`,
      description: `Find quality sheds, portable buildings, cabins, barns, and tiny houses in ${cityName}, Arkansas.`,
      type: 'website',
      locale: 'en_US',
    },
  };
}

// Generate static params for all cities
export async function generateStaticParams() {
  const cities = getMajorArkansasCities();
  
  return cities.map((city) => ({
    city: city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const citySlug = city;
  const cityName = citySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Check if this is a valid city
  const validCities = getMajorArkansasCities();
  if (!validCities.includes(cityName)) {
    notFound();
  }

  // In a real app, this would load from your CSV/API
  // For demo purposes, we'll use sample data
  const sampleDealers = [
    {
      name: "Grace Portable Buildings",
      phone: "(501) 428-4100",
      website: "https://graceportablebuildings.com",
      address: "532 US 65",
      city: "Greenbrier",
      state: "Arkansas",
      zip: "72058",
      latitude: 35.2340,
      longitude: -92.3874,
    },
    {
      name: "Jonesboro Sheds",
      phone: "(870) 932-1500",
      website: "https://jonesborosheds.com",
      address: "1234 Main St",
      city: "Jonesboro",
      state: "Arkansas",
      zip: "72401",
      latitude: 35.8423,
      longitude: -90.7043,
    },
    {
      name: "Conway Buildings",
      phone: "(501) 327-3400",
      website: "https://conwaybuildings.com",
      address: "123 College Ave",
      city: "Conway",
      state: "Arkansas",
      zip: "72032",
      latitude: 35.0887,
      longitude: -92.4421,
    },
  ];

  // Find dealers in this city
  const dealersInCity = getDealersInCity(cityName, sampleDealers);
  
  // If no dealers in city, find the closest one
  const closestDealer = dealersInCity.length === 0 ? findClosestDealer(cityName, sampleDealers) : null;
  
  const dealersToShow = dealersInCity.length > 0 ? dealersInCity : (closestDealer ? [closestDealer] : []);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="header-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sheds & Portable Buildings in {cityName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Find quality sheds, cabins, barns, and tiny houses in {cityName}, Arkansas
          </p>
          {dealersInCity.length === 0 && closestDealer && (
            <div className="bg-white/20 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-lg">
                No dealers currently in {cityName}. Showing the closest dealer in {closestDealer.city}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Dealers Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {dealersToShow.length > 0 ? (
            <>
              <DealerList 
                dealers={dealersToShow} 
                title={dealersInCity.length > 0 ? `Dealers in ${cityName}` : `Closest Dealer to ${cityName}`}
              />
              
              {/* Map Section - Client Component */}
              <div className="mt-12">
                <CityPageClient dealers={dealersToShow} cityName={cityName} />
              </div>
            </>
          ) : (
            <div className="card text-center">
              <h2 className="text-2xl font-bold text-dark-green mb-4">
                No Dealers Found
              </h2>
              <p className="text-gray-600 mb-6">
                We don&apos;t currently have dealers in {cityName}, but we&apos;re expanding our network.
              </p>
              <Link href="/locations" className="btn-primary">
                Browse All Locations
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark-green mb-8 text-center">
              Portable Buildings & Sheds in {cityName}, Arkansas
            </h2>
            
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-700 mb-6">
                Looking for quality portable buildings and sheds in {cityName}, Arkansas? 
                Natural State Sheds connects you with trusted local dealers who offer 
                premium sheds, cabins, barns, and tiny houses to meet your needs.
              </p>
              
              <h3 className="text-xl font-bold text-dark-green mb-4">
                Popular Building Types in {cityName}
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Storage Sheds:</strong> Perfect for organizing tools, equipment, and household items</li>
                <li><strong>Portable Buildings:</strong> Versatile structures for workshops, offices, and more</li>
                <li><strong>Cabins:</strong> Cozy retreats and vacation homes</li>
                <li><strong>Barns:</strong> Agricultural and storage solutions</li>
                <li><strong>Tiny Houses:</strong> Compact, efficient living spaces</li>
                <li><strong>Utility Buildings:</strong> Practical solutions for various needs</li>
              </ul>
              
              <h3 className="text-xl font-bold text-dark-green mb-4">
                Why Choose Local Dealers in {cityName}?
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Local expertise and knowledge of Arkansas building codes</li>
                <li>Personalized service and support</li>
                <li>Quick delivery and installation</li>
                <li>Ongoing maintenance and support</li>
                <li>Competitive pricing and financing options</li>
              </ul>
              
              <h3 className="text-xl font-bold text-dark-green mb-4">
                Get Started Today
              </h3>
              <p className="text-gray-700 mb-6">
                Contact our dealers in {cityName} to discuss your portable building needs. 
                They can help you choose the perfect size, style, and features for your project, 
                and provide expert installation and support.
              </p>
              
              <div className="bg-light-blue/20 rounded-lg p-6">
                <h4 className="font-bold text-dark-green mb-2">Need Help Choosing?</h4>
                <p className="text-gray-700 mb-4">
                  Our dealers can help you determine the right size and type of building for your needs, 
                  whether you need extra storage, a workshop, or a cozy cabin retreat.
                </p>
                <Link href="/" className="btn-primary">
                  Contact a Dealer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cities */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="card">
            <h2 className="text-2xl font-bold text-dark-green mb-6 text-center">
              Other Arkansas Locations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {validCities.slice(0, 12).map((city) => (
                <Link
                  key={city}
                  href={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow hover:border-dark-green"
                >
                  <span className="text-sm font-medium text-dark-green hover:text-green-700">
                    {city}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/locations" className="btn-secondary">
                View All Locations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-green text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Natural State Sheds. All rights reserved.</p>
          <p className="mt-2 text-sm opacity-80">
            Serving Arkansas with quality portable buildings and exceptional service.
          </p>
        </div>
      </footer>
    </div>
  );
} 