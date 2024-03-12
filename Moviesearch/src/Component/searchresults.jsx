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


};

export default SearchResults;
