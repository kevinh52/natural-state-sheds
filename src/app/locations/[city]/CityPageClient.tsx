'use client';

import dynamic from 'next/dynamic';
import { Dealer } from '@/lib/dealers';

// Dynamically import DealerMap to avoid SSR issues with Leaflet
const DealerMap = dynamic(() => import('@/components/DealerMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

interface CityPageClientProps {
  dealers: Dealer[];
  cityName: string;
}

export default function CityPageClient({ dealers, cityName }: CityPageClientProps) {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-dark-green mb-6 text-center">
        Dealer Locations Near {cityName}
      </h2>
      <DealerMap dealers={dealers} />
    </div>
  );
} 