import React, { useState } from 'react';
import SearchResults from './Component/searchresults';
import BookCard from './Component/bookcard';
import './Style/main.scss';
import './Style/searchresults.scss';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchResultsVisible(true);
  };

  return (
    <div className="app-container">
      <SearchResults onSearch={handleSearch} />
      {searchResultsVisible && (
        <div className="book-card-container">
          <BookCard searchTerm={searchTerm} />
        </div>
      )}
    </div>
  );
}

export default App;
