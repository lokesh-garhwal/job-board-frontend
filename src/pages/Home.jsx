import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  const getPostJobLink = () => {
    if (!user) return '/login';
    if (user.role === 'EMPLOYER') return '/employer/post-job';
    return '/candidate/dashboard';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-4 relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="text-center max-w-3xl relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Dream Job</span> Today
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Connect with top employers and discover opportunities that match your skills. Join thousands of professionals accelerating their careers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/jobs" className="w-full sm:w-auto bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-xl transition transform hover:-translate-y-1">
            Explore Jobs
          </Link>
          <Link to={getPostJobLink()} className="w-full sm:w-auto bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-xl font-bold text-lg shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition transform hover:-translate-y-1">
            {user?.role === 'CANDIDATE' ? 'Go to Dashboard' : 'Post a Job'}
          </Link>
        </div>
      </div>
    </div>
  );
}
