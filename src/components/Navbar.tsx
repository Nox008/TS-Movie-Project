import { Sun, Moon } from 'lucide-react'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  return (
    <nav className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#d2b48c] text-gray-900'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MovieSearch</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${
            darkMode ? 'bg-purple-900 hover:bg-purple-800' : 'bg-[#c19a6b] hover:bg-[#ab876d]'
          }`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar