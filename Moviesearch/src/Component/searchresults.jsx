import React, { useState } from 'react';

const SearchResults = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Definerer en state for søkebegrepet
  const [searchResults, setSearchResults] = useState([]); // Definerer en state for søkeresultatene

  // Funksjon for å håndtere endringer i input-feltet for søkebegrepet
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Funksjon for å starte søket når brukeren klikker på søkeknappen
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  // Funksjon for å utføre søk på Amazon når brukeren klikker på knappen
  const handleAmazonSearch = (title) => {
    console.log("Søker etter bok med tittel:", title); // Konsolllogg for å vise tittelen som blir sendt til Amazon-søket
    const searchQuery = encodeURIComponent(title);
    window.open(`https://www.amazon.com/s?k=${searchQuery}`, '_blank');
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
              <div>{result.title}</div> {/* Viser tittelen på søkeresultatet */}
              <button onClick={() => handleAmazonSearch(result.title)}>Search on Amazon</button> {/* Knapp for å søke etter boken på Amazon */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
