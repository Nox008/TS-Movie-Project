// components/Hero.tsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import debounce from 'lodash/debounce'
import { OMDB_API_KEY } from '../config'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

interface HeroProps {
  darkMode: boolean
}

const Hero = ({ darkMode }: HeroProps) => {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const fetchSuggestions = debounce(async (query: string) => {
    if (query.length < 3) return setSuggestions([])
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`
      )
      const data = await response.json()
      if (data.Search) {
        // Get more results for scrolling
        setSuggestions(data.Search.slice(0, 10))
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    }
  }, 300)

  useEffect(() => {
    fetchSuggestions(search)
  }, [search])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100
    setScrollPosition(scrollPercentage)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Find Your Favorite Movies
        </h2>
        <div className="relative w-full max-w-2xl mx-auto">
          <div className={`sticky top-0 z-50 bg-transparent backdrop-blur-md bg-opacity-90 pt-4 pb-2 ${
            scrollPosition > 0 ? 'shadow-lg' : ''
          }`}>
            <div className={`relative flex items-center ${isFocused ? 'ring-2 ring-offset-2' : ''} 
              ${darkMode ? 'ring-purple-500' : 'ring-[#d2b48c]'} rounded-lg transition-all duration-200`}>
              <Search className={`absolute left-4 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Search for movies..."
                className={`w-full p-4 pl-12 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500'
                } border ${darkMode ? 'border-gray-600' : 'border-[#d2b48c]'}
                  focus:outline-none transition-all duration-200`}
              />
            </div>
          </div>

          {suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              onScroll={handleScroll}
              className={`mt-2 rounded-lg shadow-xl overflow-y-auto max-h-[60vh]
                ${darkMode ? 'bg-gray-800' : 'bg-white'} z-40
                transition-all duration-200 ease-in-out transform
                scrollbar-thin ${darkMode 
                  ? 'scrollbar-thumb-gray-600 scrollbar-track-gray-800' 
                  : 'scrollbar-thumb-[#d2b48c] scrollbar-track-[#f5f5dc]'}`}
              style={{
                scrollBehavior: 'smooth'
              }}
            >
              {suggestions.map((movie, index) => (
                <div
                  key={movie.imdbID}
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                  className={`group p-4 cursor-pointer transition-all duration-200
                    ${darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-[#f5f5dc]'}
                    transform transition-all duration-300
                    ${scrollPosition > 0 ? 'translate-y-0' : ''}`}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-md
                      group-hover:transform group-hover:scale-105 transition-all duration-200">
                      <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                        alt={movie.Title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}
                        group-hover:transform group-hover:translate-x-1 transition-all duration-200`}>
                        {movie.Title}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}
                        group-hover:transform group-hover:translate-x-1 transition-all duration-200`}>
                        {movie.Year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero