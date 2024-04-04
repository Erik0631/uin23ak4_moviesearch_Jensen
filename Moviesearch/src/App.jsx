import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,  } from 'react-router-dom'; 

import SearchResults from './Component/searchresults';
import BookCard from './Component/bookcard';
import './Style/main.scss';
import './Style/searchresults.scss';

function App() {
  const [searchTerm, setSearchTerm] = useState('James Bond');
  const [searchResultsVisible, setSearchResultsVisible] = useState(true);

  useEffect(() => {
    // Søk etter James Bond-bøker når siden lastes
    handleSearch('James Bond');
  }, []); // Tom [] sikrer at useEffect kun kjøres en gang 

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchResultsVisible(true);
  };

  return (
    <Router> {}
      <h1>Oppgave 4, Bok søk</h1>
      <div className="app-container">
        <SearchResults onSearch={handleSearch} />
        {searchResultsVisible && (
          <div className="book-card-container">
            <BookCard searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
