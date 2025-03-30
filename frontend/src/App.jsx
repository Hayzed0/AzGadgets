import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar /> 
      <main className='container min-h-screen flex flex-col mx-auto '>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App