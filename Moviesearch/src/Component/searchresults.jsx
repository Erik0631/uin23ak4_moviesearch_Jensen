import React, { useState } from 'react';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Her kan du utføre søket basert på searchTerm
    // For nå setter vi bare resultatet til det som er skrevet inn i søkefeltet
    setResult(searchTerm);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Skriv inn søket ditt..." 
        value={searchTerm} 
        onChange={handleInputChange} 
      />
      <button onClick={handleSearch}>Søk</button>
      <div>
        <h2>Resultat:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default SearchResults;
