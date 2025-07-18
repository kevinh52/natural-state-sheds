'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dealer } from '@/lib/dealers';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DealerMapProps {
  dealers: Dealer[];
  center?: [number, number];
  zoom?: number;
}

export default function DealerMap({ dealers, center = [35.2010, -91.8318], zoom = 7 }: DealerMapProps) {
  const mapRef = useRef<L.Map>(null);

  // Filter dealers with coordinates
  const dealersWithCoords = dealers.filter(dealer => dealer.latitude && dealer.longitude);

  useEffect(() => {
    if (mapRef.current && dealersWithCoords.length > 0) {
      const bounds = L.latLngBounds(
        dealersWithCoords.map(dealer => [dealer.latitude!, dealer.longitude!])
      );
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [dealersWithCoords]);

  return (
    <div className="w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '400px', width: '100%' }}
        ref={mapRef}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {dealersWithCoords.map((dealer, index) => (
          <Marker
            key={index}
            position={[dealer.latitude!, dealer.longitude!]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-dark-green">{dealer.name}</h3>
                <p className="text-sm text-gray-600">{dealer.address}</p>
                <p className="text-sm text-gray-600">{dealer.city}, {dealer.state} {dealer.zip}</p>
                {dealer.phone && (
                  <p className="text-sm">
                    <a href={`tel:${dealer.phone}`} className="text-blue-600 hover:underline">
                      {dealer.phone}
                    </a>
                  </p>
                )}
                {dealer.website && (
                  <p className="text-sm">
                    <a 
                      href={dealer.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 