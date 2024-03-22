import React, { useState } from 'react';
import SearchResults from './Component/searchresults';
import BookCard from './Component/bookcard';
import './Style/main.scss';
import './Style/searchresults.scss';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <SearchResults onSearch={handleSearch} />
      <BookCard searchTerm={searchTerm} />
    </>
  );
}

export default App;
