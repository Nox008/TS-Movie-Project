import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import MovieDetails from './components/MovieDetails'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero darkMode={darkMode} />} />
            <Route path="/movie/:id" element={<MovieDetails darkMode={darkMode} />} />
          </Routes>
        </div>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  )
}

export default App