import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Definerer en state for søkebegrepet
  const [searchResults, setSearchResults] = useState([]); // Definerer en state for søkeresultatene

  // Funksjon for å håndtere endringer i input-feltet for søkebegrepet
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Funksjon for å starte søket når brukeren klikker på søkeknappen
  const handleSearch = () => {
    // Sjekk om lengden på søketeksten er minst tre tegn 
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
    }
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
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
