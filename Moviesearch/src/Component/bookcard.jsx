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
          throw new Error('Failed to fetch data');
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

  const handleAmazonSearch = (amazonId) => {
    window.open(`https://www.amazon.com/s?k=0395082544=${amazonId}`, '_blank');
  };

  if (isLoading) {
    return <div>Laster...</div>;
  }

  if (error) {
    return <div>Feil: {error.message}</div>;
  }

  return (
    <div>
      {searchResults.length > 0 ? (
        <div>
          {searchResults.map((book) => (
            <div key={book.key} className="book-card">
              <div className="book-details">
                <div>Title: {book.title}</div>
                <div>First published year: {book.first_publish_year}</div>
                <div>Author: {book.author_name}</div>
                <div>Average rating: {book.average_rating}</div>
              </div>
              <button onClick={() => handleAmazonSearch(book.amazon_id)}>Search on Amazon</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};

export default BookCard;
