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



    <input id="apiUrl"></input>

  
    <button id='apiUrl'>trykk her</button>


    </div>
    </>


  )
}

export default App
