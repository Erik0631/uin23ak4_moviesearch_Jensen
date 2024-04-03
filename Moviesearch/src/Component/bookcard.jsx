import React, { useState, useEffect } from 'react';

const BookCard = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]); //lagre søkeresultater
  const [isLoading, setIsLoading] = useState(false); // Viser at data laster
  const [error, setError] = useState(null); //lagrer eventuelle feilmeldinger

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) { // Sjekk om søketeksten er tom
        setSearchResults([]); // Sett søkeresultatene til en tom liste
        return;
      }

      setIsLoading(true); 
      try {
        const response = await fetch(`https://openlibrary.org/search.json?title=James+Bond=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('Feil melding'); // Gir en feilmelding
        const data = await response.json(); // Endrer responsen til JSON-format
        setSearchResults(data.docs); // Lagrer søkeresultatene i state
      } catch (error) {
        setError(error); // Lagrer eventuelle feilmeldinger
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Henter fetchData-funksjonen
  }, [searchTerm]); 

  const handleAmazonSearch = (isbn) => {
    const amazonUrl = `https://www.amazon.com/s?k=${isbn}`;
    window.open(amazonUrl, '_blank'); // Åpne lenken i en ny fane
  };

  return (
    <div>
      {isLoading ? (
        <div>Laster...</div> // Viser "Laster..." når siden søker 
      ) : error ? (
        <div>Error: {error.message}</div> // Vis feilmeldingen hvis det oppstår en feil
      ) : (
        <div>
          {searchResults.length > 0 ? ( // Sjekk om det finnes søkeresultater
            <div>
              {searchResults.map((book) => (
                <div key={book.key} className="book-card">
                  <div className="book-details">
                    <div>Title: {book.title}</div>
                    <div>First published year: {book.first_publish_year}</div>
                    <div>Author: {book.author_name}</div> {/* Vis forfatteren */}
                    <div>Average rating: {book.ratings_average || 'Rating not available'}</div> {/* Vis gjennomsnittlig rangering eller en melding hvis rating ikke er tilgjengelig */}
                    <article>
                      {book.cover_i && (
                        <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" />
                      )} {/* Vis bokomslaget hvis tilgjengelig */}
                    </article>
                  </div>
                  <button onClick={() => handleAmazonSearch(book.isbn[0])}>Søk hos Amazon</button> {/* Klikkbar knapp for å søke på Amazon */}
                </div>
              ))}
            </div>
          ) : (
            <div>Ingen resultater</div> // Vis "Ingen resultater" hvis det ikke finnes søkeresultater
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
