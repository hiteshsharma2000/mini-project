import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: Install Lucide for icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-semibold">
          My Library
        </Link>

        {/* Hamburger icon on mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation links */}
        <div
          className={`flex-col md:flex-row md:flex gap-4 items-center absolute md:static bg-indigo-600 md:bg-transparent left-0 w-full md:w-auto top-full transition-all duration-300 ease-in-out ${
            menuOpen ? 'flex' : 'hidden'
          }`}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {user && (
            <Link to="/my-books" onClick={() => setMenuOpen(false)}>
              My Books
            </Link>
          )}
          {!user && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
          {user && (
            <>
              <span className="text-sm italic">{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-white text-indigo-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
