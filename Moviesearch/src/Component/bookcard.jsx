const apiUrl = 'https://openlibrary.org/search.json?title=James+Bond';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Gjør noe med dataen her, for eksempel vis den i konsollen
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  
  