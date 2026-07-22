import { useState, useCallback } from 'react';
import { debounce } from '../utils/helpers';

export default function SearchBar({ onSearch, placeholder = 'Search...' }) {
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(debounce((q) => onSearch(q), 400), [onSearch]);

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
      />
    </div>
  );
}
