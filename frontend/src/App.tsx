import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const App:React.FC = () => {
  return (
    <div className="flex flex-col w-[100%] h-[100vh]">
      <Navbar></Navbar>
      <Hero />
    </div>
  )
}

export default App
