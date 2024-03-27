import React, { useState, useEffect } from 'react';

const BookCard = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]); // State for å lagre søkeresultatene
  const [isLoading, setIsLoading] = useState(false); // State for å indikere om dataene lastes
  const [error, setError] = useState(null); // State for å lagre eventuelle feilmeldinger

  useEffect(() => {
    // Effektfunksjon for å hente data
    const fetchData = async () => {
      if (!searchTerm) {
        // Sjekker om søketeksten er tom
        setSearchResults([]); // Setter søkeresultatene til en tom liste hvis søketeksten er tom
        return;
      }

      setIsLoading(true); // Setter isLoading til true for å indikere at dataene lastes
      try {
        // Prøver å hente data fra API-et
        const response = await fetch(`https://openlibrary.org/search.json?title=James+Bond=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          // Sjekker om responsen er ok
          throw new Error('Failed to fetch data'); // Kaster en feilmelding hvis responsen ikke er ok
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

  // Funksjon for å håndtere søket på Amazon
  const handleAmazonSearch = (title) => {
    const searchQuery = encodeURIComponent(title); // Kodierer tittelen for å sikre gyldig URL
    window.open(`https://www.amazon.com/s?k=${searchQuery}`, '_blank'); // Åpner Amazon-søk i ny fane med tittelen som søkebegrep
  };

  if (isLoading) {
    // Hvis dataene lastes
    return <div>Laster...</div>; // Viser en "Loading..."-melding
  }

  if (error) {
    // Hvis det oppstår en feil under henting av data
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
              <button onClick={() => handleAmazonSearch(book.title)}>Søk hos Amazon</button> {/* Knapp for å søke på Amazon */}
            </div>
          ))}
        </div>
      ) : (
        <div>Ingen resultater</div> // Hvis det ikke finnes søkeresultater, viser en melding om ingen resultater
      )}
    </div>
  );
};

export default BookCard;
