'use client';

import { Dealer } from '@/lib/dealers';

interface DealerListProps {
  dealers: Dealer[];
  title?: string;
}

export default function DealerList({ dealers, title = "Our Dealers" }: DealerListProps) {
  if (dealers.length === 0) {
    return (
      <div className="card">
        <h3 className="text-xl font-bold text-dark-green mb-4">{title}</h3>
        <p className="text-gray-600">No dealers found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-dark-green mb-6">{title} ({dealers.length})</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealers.map((dealer, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-lg text-dark-green mb-2">{dealer.name}</h4>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">Address:</span><br />
                {dealer.address}<br />
                {dealer.city}, {dealer.state} {dealer.zip}
              </p>
              
              {dealer.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span>{' '}
                  <a 
                    href={`tel:${dealer.phone}`} 
                    className="text-blue-600 hover:underline"
                  >
                    {dealer.phone}
                  </a>
                </p>
              )}
              
              {dealer.website && (
                <p className="text-gray-600">
                  <span className="font-medium">Website:</span>{' '}
                  <a 
                    href={dealer.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Site
                  </a>
                </p>
              )}
              
              {dealer.facebookUrl && (
                <p className="text-gray-600">
                  <span className="font-medium">Facebook:</span>{' '}
                  <a 
                    href={`https://facebook.com/${dealer.facebookUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </p>
              )}
              
              {dealer.email && (
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{' '}
                  <a 
                    href={`mailto:${dealer.email}`} 
                    className="text-blue-600 hover:underline"
                  >
                    {dealer.email}
                  </a>
                </p>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a 
                href={`/locations/${dealer.city.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-dark-green hover:text-green-700 font-medium text-sm"
              >
                View {dealer.city} Location →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 