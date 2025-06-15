
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search } from 'lucide-react';

interface AddressAutofillProps {
  onAddressSelect: (address: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }) => void;
  placeholder?: string;
  label?: string;
}

const AddressAutofill: React.FC<AddressAutofillProps> = ({
  onAddressSelect,
  placeholder = "Enter your address",
  label = "Address *"
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Mock address suggestions (in real implementation, this would use Google Places API)
  const mockAddresses = [
    {
      description: "123 Main Street, New York, NY 10001",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "US"
    },
    {
      description: "456 Oak Avenue, Los Angeles, CA 90210",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      country: "US"
    },
    {
      description: "789 Pine Street, Chicago, IL 60601",
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "US"
    },
    {
      description: "321 Elm Drive, Miami, FL 33101",
      address: "321 Elm Drive",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "US"
    },
    {
      description: "654 Maple Lane, Seattle, WA 98101",
      address: "654 Maple Lane",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "US"
    }
  ];

  const searchAddresses = (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockAddresses.filter(addr =>
        addr.description.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsLoading(false);
      setShowSuggestions(true);
    }, 300);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce search
    timeoutRef.current = setTimeout(() => {
      searchAddresses(value);
    }, 500);
  };

  const handleAddressSelect = (address: any) => {
    setInputValue(address.description);
    setShowSuggestions(false);
    onAddressSelect(address);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  useEffect(() => {
    // Note: In a real implementation, you would load the Google Places API here
    // const script = document.createElement('script');
    // script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    // script.async = true;
    // document.head.appendChild(script);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <Label htmlFor="address">{label}</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id="address"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          onFocus={() => inputValue.length >= 3 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10"
          required
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      {/* Address Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
              onClick={() => handleAddressSelect(suggestion)}
            >
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm">{suggestion.description}</span>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showSuggestions && suggestions.length === 0 && inputValue.length >= 3 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center text-gray-500">
          <Search className="h-4 w-4 mx-auto mb-2" />
          <p className="text-sm">No addresses found</p>
          <p className="text-xs text-gray-400 mt-1">
            Try entering more specific details
          </p>
        </div>
      )}

      {/* Google Places API Note */}
      <p className="text-xs text-gray-500 mt-1">
        💡 In production, this would use Google Places API for real address suggestions
      </p>
    </div>
  );
};

export default AddressAutofill;
