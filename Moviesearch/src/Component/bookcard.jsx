import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        const response = await fetch(`https://openlibrary.org/search.json?title=James+Bond=${encodeURIComponent(searchTerm)}`);  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent//
        if (!response.ok) throw new Error('Feil melding');
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
  

  const handleAmazonSearch = (title) => {
    const searchQuery = encodeURIComponent(title);
    //åpner amazon 
    window.open(`https://www.amazon.com/s?k=${searchQuery}`, '_blank');
  };

  //Henter fra bookcard
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
              {searchResults.map((book) => (
                <div key={book.key} className="book-card">
                  <div className="book-details">
                    <div>Title: {book.title}</div>
                    <div>First published year: {book.first_publish_year}</div>
                    <div>Author: {book.author_name}</div>
                    <div>Average rating: {book.ratings_average || 'Rating not available'}</div>
                    <article>  
                    {book.cover_i && (
                      <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="Book Cover" /> //Henter book cover
                     )}
                
                    </article>
                  </div>
                  <button onClick={() => handleAmazonSearch(book.title)}>Søk hos Amazon</button>   
                </div>
              ))}
            </div>
          ) : (
            <div>Ingen resultater</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
