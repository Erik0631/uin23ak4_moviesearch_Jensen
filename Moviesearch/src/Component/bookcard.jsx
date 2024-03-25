import React, { useState, useEffect } from 'react';

const BookCard = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]); // Lagrer søkeresultatene
  const [isLoading, setIsLoading] = useState(false); // Indikerer om data lastes
  const [error, setError] = useState(null); // Lagrer eventuelle feilmeldinger

  useEffect(() => {
    const fetchData = async () => { // Definerer en asynkron funksjon for å hente data
      if (!searchTerm) { // Sjekker om søketeksten er tom
        setSearchResults([]); // Hvis tom, sett søkeresultatene til tom liste og avslutt
        return;
      }

      setIsLoading(true); // Setter isLoading til true for å vise at dataene lastes
      try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`); // Gjør et API-kall for å hente data
        if (!response.ok) { // Sjekker om responsen er ok
          throw new Error('Failed to fetch data'); // Hvis ikke, kast en feilmelding
        }
        const data = await response.json(); // Konverterer responsen til JSON-format
        setSearchResults(data.docs); // Lagrer søkeresultatene i state
      } catch (error) {
        setError(error); // Hvis det oppstår en feil, lagrer feilmeldingen i state
      } finally {
        setIsLoading(false); // Setter isLoading til false når dataene er hentet eller hvis det oppstår en feil
      }
    };

    

    fetchData(); // Kaller fetchData-funksjonen når komponenten blir montert eller når searchTerm endres
  }, [searchTerm]); // Reagerer på endringer i searchTerm

  const handleAmazonSearch = (amazonId) => { // Håndterer søk på Amazon
    window.open(`https://www.amazon.com/${amazonId}`, '_blank'); // Åpner en ny fane med Amazon-søket
    
  };

  if (isLoading) { // Hvis data lastes
    return <div>Loading...</div>; // Viser en "Loading..."-melding
  }

  if (error) { // Hvis det oppstår en feil under henting av data
    return <div>Error: {error.message}</div>; // Viser en feilmelding
  }

  

  return (
    <div>
      {searchResults.length > 0 ? ( // Sjekker om det finnes søkeresultater
        <div>
          {searchResults.map((book) => ( // Går gjennom hvert søkeresultat og lager et kort for hver bok
            <div key={book.key} className="book-card">
              <div className="book-details">
                <div>Title: {book.title}</div> {/* Viser boktittelen */}
                <div>First published year: {book.first_publish_year}</div> {/* Viser første publiseringsår */}
                <div>Author: {book.author_name}</div> {/* Viser forfatteren */}
                <div>Average rating: {book.average_rating}</div> {/* Viser gjennomsnittlig rangering */}
                {book.cover_i && ( // Sjekker om det finnes en bokforside
                  <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" /> // Viser bokforsiden som et bilde
                )}
              </div>
              <button onClick={() => handleAmazonSearch(book.amazon_id)}>Search on Amazon</button> {/* Knapp for å søke på Amazon */}
            </div>
          ))}
        </div>
      ) : (
        <div>No results</div> // Hvis det ikke finnes søkeresultater, viser en melding om ingen resultater
      )}
    </div>
  );
};

export default BookCard;
