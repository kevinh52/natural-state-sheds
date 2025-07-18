'use client';

import { useState } from 'react';
import { Dealer } from '@/lib/dealers';

interface SearchDealersProps {
  dealers: Dealer[];
  onSearch: (results: Dealer[]) => void;
}

export default function SearchDealers({ dealers, onSearch }: SearchDealersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'city' | 'zip'>('city');

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      onSearch(dealers);
      return;
    }

    const results = dealers.filter(dealer => {
      if (searchType === 'city') {
        return dealer.city.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return dealer.zip.includes(searchTerm);
      }
    });

    onSearch(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-dark-green mb-4">Find a Dealer Near You</h3>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search by {searchType === 'city' ? 'City' : 'Zip Code'}
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={searchType === 'city' ? 'Enter city name...' : 'Enter zip code...'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-green focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'city' | 'zip')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-green focus:border-transparent"
          >
            <option value="city">City</option>
            <option value="zip">Zip Code</option>
          </select>
          
          <button
            onClick={handleSearch}
            className="btn-primary whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>Search for dealers in your area or browse all locations below.</p>
      </div>
    </div>
  );
} 