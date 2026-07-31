import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // NEW: Create a reference to the dropdown menu
  const dropdownRef = useRef(null);

  // NEW: Add an event listener to close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => { 
    logout(); 
    setDropdownOpen(false); // Close dropdown on logout
    navigate('/login'); 
  };
  
  const getInitials = () => {
    if (!user) return '';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between items-center h-full">
          <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-tight">JobBoard Pro</Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/jobs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Explore Jobs</Link>
            
            {/* Dark Mode Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none">
              {isDarkMode ? '🌙' : '☀️'}
            </button>

            {user ? (
              // NEW: Attached the ref to this wrapper div
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition">
                    {getInitials()}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2">
                    <div className="px-4 py-2 border-b border-gray-50 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role.toLowerCase()}</p>
                    </div>
                    {user.role === 'EMPLOYER' && <Link to="/employer/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>}
                    {user.role === 'CANDIDATE' && <Link to="/candidate/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>}
                    
                    {user.role === 'ADMIN' && <Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">Admin Panel</Link>}
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400">My Profile</Link>
                    
                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 dark:bg-blue-500 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition shadow-md">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}