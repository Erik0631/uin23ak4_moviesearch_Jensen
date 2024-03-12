import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Style/main.scss'
import './Component/bookcard'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div class="square"></div>

     <button id='apiUrl'>trykk her</button>
    </>


  )
}

export default App
