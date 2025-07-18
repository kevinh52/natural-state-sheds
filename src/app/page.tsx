'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Dealer } from '@/lib/dealers';
import Header from '@/components/Header';
import SearchDealers from '@/components/SearchDealers';
import DealerList from '@/components/DealerList';
import Link from 'next/link';

// Dynamically import DealerMap to avoid SSR issues with Leaflet
const DealerMap = dynamic(() => import('@/components/DealerMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

export default function HomePage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [filteredDealers, setFilteredDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate loading the CSV data
    const loadDealers = async () => {
      try {
        // This would normally be an API call to get the CSV data
        // For demo purposes, we'll create some sample data
        const sampleDealers: Dealer[] = [
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
          {
            name: "Russellville Build",
            phone: "(479) 968-6700",
            website: "https://russellvillebuildings.com",
            address: "123 Arkansas Ave",
            city: "Russellville",
            state: "Arkansas",
            zip: "72801",
            latitude: 35.2784,
            longitude: -93.1338,
          },
          {
            name: "Harrison Build",
            phone: "(870) 741-5600",
            website: "https://harrisonbuildings.com",
            address: "567 Main St",
            city: "Harrison",
            state: "Arkansas",
            zip: "72601",
            latitude: 36.2298,
            longitude: -93.1077,
          },
        ];

        setDealers(sampleDealers);
        setFilteredDealers(sampleDealers);
      } catch (error) {
        console.error('Error loading dealers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDealers();
  }, []);

  const handleSearch = (results: Dealer[]) => {
    setFilteredDealers(results);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-green mx-auto"></div>
          <p className="mt-4 text-dark-green">Loading dealers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="header-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Quality Portable Buildings & Sheds
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Serving Arkansas with premium sheds, cabins, barns, and tiny houses
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#dealers" className="btn-secondary">
              Find a Dealer
            </a>
            <Link href="/locations" className="bg-white text-dark-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Browse Locations
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="dealers" className="py-12">
        <div className="container mx-auto px-4">
          <SearchDealers dealers={dealers} onSearch={handleSearch} />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="card">
            <h2 className="text-2xl font-bold text-dark-green mb-6 text-center">
              Find Dealers Near You
            </h2>
            <DealerMap dealers={filteredDealers} />
          </div>
        </div>
      </section>

      {/* Dealers List Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <DealerList dealers={filteredDealers} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark-green text-center mb-12">
            Why Choose Natural State Sheds?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-dark-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-2">Local Dealers</h3>
              <p className="text-gray-600">Find trusted dealers throughout Arkansas with local expertise and service.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brown text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-2">Quality Products</h3>
              <p className="text-gray-600">Premium sheds, cabins, barns, and tiny houses built to last.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-light-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-2">Expert Support</h3>
              <p className="text-gray-600">Get personalized advice and support from experienced professionals.</p>
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
