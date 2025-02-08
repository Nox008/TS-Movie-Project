const Footer = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <footer className={`p-4 ${
      darkMode 
        ? 'bg-gray-800 text-white' 
        : 'bg-emerald-700 text-white'
    }`}>
      <div className="container mx-auto text-center">
        <p>&copy; 2025 MovieSearch. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer