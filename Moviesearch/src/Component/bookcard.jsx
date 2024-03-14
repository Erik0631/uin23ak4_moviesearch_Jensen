

const apiUrl = async () =>{
    fetch(`https://openlibrary.org/search.json?title=James+Bond`)
    .then(response => response.json())
    .then(data => setPost(data))
    .catch(error => console.error(error))
}
  




