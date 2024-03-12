

const apiUrl = 'https://openlibrary.org/search.json?title=James+Bond';


fetch(apiUrl)
.then(response => response.json())
.then(data => setPost(data))
.catch(error => console.error(error))
  




