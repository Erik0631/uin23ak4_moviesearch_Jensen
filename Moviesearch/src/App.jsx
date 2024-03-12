import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Style/main.scss'
import './Component/bookcard'




function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState(``);

  const  handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    };

  return (
    <>
    <div class="square">
     <input 
        type="text" 
        placeholder="Skriv inn søket ditt..." 
        value={searchTerm} 
        onChange={handleInputChange} 
      />
      <button id='apiUrl'>trykk her</button>


    </div>
    </>


  )
}

export default App
