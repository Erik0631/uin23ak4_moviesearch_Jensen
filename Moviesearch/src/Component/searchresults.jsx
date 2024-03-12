import React, { useState } from 'react';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {

    setResult(searchTerm);
  };


};

export default SearchResults;
