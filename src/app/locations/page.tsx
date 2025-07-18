import { getMajorArkansasCities } from '@/lib/dealers';
import Header from '@/components/Header';
import Link from 'next/link';

export default function LocationsPage() {
  const cities = getMajorArkansasCities();

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="header-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Sheds Near You
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Browse locations throughout Arkansas for portable buildings and sheds
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="card">
            <h2 className="text-2xl font-bold text-dark-green mb-8 text-center">
              All Arkansas Locations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow hover:border-dark-green"
                >
                  <h3 className="font-semibold text-dark-green hover:text-green-700">
                    Sheds in {city}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Portable buildings & sheds
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark-green mb-8 text-center">
              Portable Buildings & Sheds Throughout Arkansas
            </h2>
            
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-700 mb-6">
                Natural State Sheds connects you with trusted dealers throughout Arkansas, 
                offering quality portable buildings, sheds, cabins, barns, and tiny houses. 
                Whether you&apos;re in Little Rock, Fayetteville, Jonesboro, or any other Arkansas city, 
                we have local dealers ready to serve your needs.
              </p>
              
              <h3 className="text-xl font-bold text-dark-green mb-4">
                Our Product Range
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
                Why Choose Local Arkansas Dealers?
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Local expertise and knowledge of Arkansas building codes</li>
                <li>Personalized service and support</li>
                <li>Quick delivery and installation</li>
                <li>Ongoing maintenance and support</li>
                <li>Competitive pricing and financing options</li>
              </ul>
              
              <p className="text-gray-700">
                Browse our location pages to find dealers in your area, or contact us directly 
                for personalized assistance with your portable building needs.
              </p>
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