import React, { useState, useEffect } from 'react';

const BookCard = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?title=James+Bond+${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('Ingen treff');
        }
        const data = await response.json();
        setSearchResults(data.docs);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (isLoading) {
    return <div>Laster....</div>;
  }

  if (error) {
    return <div>Feil: {error.message}</div>;
  }

  return (
    <div>
      {searchResults.length > 0 ? (
        <div>
          {searchResults.map((book) => (
            <div key={book.key}>
              {book.title}
            </div>
          ))}
        </div>
      ) : (
        <div>Ingen resultater</div>
      )}
    </div>
  );
};

export default BookCard;
