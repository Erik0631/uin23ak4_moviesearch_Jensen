import React, { useState, useEffect } from 'react';

const BookCard = ({ searchTerm }) => {
  //lagre søkeresultater
  const [searchResults, setSearchResults] = useState([]); 
  //vise om datan som laster stemmer 
  const [isLoading, setIsLoading] = useState(false);
  //lagre eventuelle feilmeldinger 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) return setSearchResults([]);  //sjekker om searchTerm er tom når den skal søke

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
  ; //Søkefunskjon for Amazon https://www.w3schools.com/jsref/met_win_open.asp
  const handleAmazonSearch = (isbn) => window.open(`https://www.amazon.com/s?k=${isbn}`, '_blank')

  return (
    <div>
      {isLoading ? (
        <div>Laster...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((book) => (/* Henter bok informajson  */
                <div key={book.key} className="book-card">
                  <div className="book-details">
                  <article>
                    <div>Title:{book.title}</div>
                    <div>First published year: {book.first_publish_year}</div>
                    <div>Author: {book.author_name}</div>
                    <div>Average rating: {book.ratings_average || 'Rating not available'}</div> {/* Henter rating vis dette er tilgjengelig*/}
                      {book.cover_i && (
                        <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" />  /* Henter book cover vis det er tilgjendlig  */
                      )}
                    </article> 
                  </div>
                  <button onClick={() => handleAmazonSearch(book.isbn[0])}>Amazon</button> {/* Knapp for å søke på Amazon */}
                </div>
              ))}
            </div>
          ) : (
            <div>Ingen Resultater</div> //Feilmelding 
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
