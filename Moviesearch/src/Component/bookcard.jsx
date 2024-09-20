import React, { useState, useEffect } from 'react';

const BookCard = ({ searchTerm }) => {
  //lagrer søkeresultater
  const [searchResults, setSearchResults] = useState([]); 
  //viser om datan som laster stemmer 
  const [isLoading, setIsLoading] = useState(false);
  //lagrer eventuelle feilmeldinger 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`); // Henter data fra Open Library// 
        if (!response.ok) throw new Error('Feil melding');
        const data = await response.json();
        setSearchResults(data.docs); //Henter data 
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); //Stopper laste funksjonen 
      }
    };

    fetchData();
  }, [searchTerm]);
  ; //Søkefunskjon for Amazon// ref https://www.w3schools.com/jsref/met_win_open.asp
  const handleAmazonSearch = (isbn) => window.open(`https://www.amazon.com/s?k=${isbn}`, '_blank') /* Bruker boken sin isbn for å søke hos Amazon */

  return (

  <div>
    {isLoading ? (
      <div>Henter fra Openlibrary...</div>
    ) : error ? (
      <div>Error: {error.message}</div>
    ) : (
      <div className="book-card-container">
        {searchResults.length > 0 ? (
          searchResults.map((book) => (
            <div key={book.key} className="book-card">
              <div>Title: {book.title}</div>
              <div>First published year: {book.first_publish_year}</div>
              <div>Author: {book.author_name}</div>
              <div>Average rating: {book.ratings_average || 'Rating not available'}</div>
                  {book.cover_i && (
                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" />
                  )}
            </div>
          ))
        ) : (
          <div>Ingen Resultater</div> //Feilmelding
        )}
      </div>
    )}
  </div>
);

};

export default BookCard;
