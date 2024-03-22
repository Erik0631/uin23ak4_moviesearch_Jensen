import React, { useState } from 'react';

const SearchResults = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleInputChange} 
        placeholder="Søk etter tittel..." 
      />
      <button onClick={handleSearch}>Søk</button>
      <div className="search-results">
        <div className="search-results-inner">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result">
              {result.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
