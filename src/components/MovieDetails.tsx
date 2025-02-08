// components/MovieDetails.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { OMDB_API_KEY } from '../config'
import { ArrowLeft } from 'lucide-react'

interface MovieDetailsProps {
  darkMode: boolean
}

interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Runtime: string
  Genre: string
  Director: string
  Plot: string
  Language: string
  Awards: string
  Poster: string
  imdbRating: string
  Actors: string
}

const MovieDetails = ({ darkMode }: MovieDetailsProps) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
        )
        const data = await response.json()
        setMovie(data)
        // Trigger animation after data is loaded
        setTimeout(() => setIsVisible(true), 100)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    }

    if (id) fetchMovie()
    return () => setIsVisible(false)
  }, [id])

  const handleBack = () => {
    setIsVisible(false)
    setTimeout(() => navigate('/'), 300) // Wait for exit animation
  }

  if (!movie) return <div>Loading...</div>

  return (
    <div className={`relative container mx-auto px-4 py-8 ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      <button
        onClick={handleBack}
        className={`fixed top-20 left-4 md:left-8 z-10 p-2 rounded-full 
          ${darkMode 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }
          transform transition-all duration-300 ease-in-out hover:scale-110`}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 
        transition-all duration-300 ease-in-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-center md:sticky md:top-0 h-[calc(100vh-12rem)]">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
              alt={movie.Title}
              className={`rounded-lg shadow-lg max-h-full w-auto object-contain
                transition-all duration-500 ease-in-out
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            />
          </div>
        </div>
        <div className={`transition-all duration-300 ease-in-out delay-100
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <p className="font-semibold">Year</p>
              <p>{movie.Year}</p>
            </div>
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <p className="font-semibold">Rating</p>
              <p>{movie.imdbRating}/10</p>
            </div>
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <p className="font-semibold">Runtime</p>
              <p>{movie.Runtime}</p>
            </div>
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <p className="font-semibold">Language</p>
              <p>{movie.Language}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="leading-relaxed">{movie.Plot}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <p>{movie.Actors}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Awards</h2>
              <p>{movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails