import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [error, setError] = useState(''); const [successMsg, setSuccessMsg] = useState('');
  const { login } = useContext(AuthContext); const navigate = useNavigate(); const location = useLocation();

  useEffect(() => { if (location.state?.message) setSuccessMsg(location.state.message); }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSuccessMsg('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, userId, email: userEmail, role } = response.data;
      login({ userId, email: userEmail, role }, token);
      if (role === 'EMPLOYER') navigate('/employer/dashboard');
      else if (role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/candidate/dashboard');
    } catch (err) { setError(err.response?.data || 'Failed to login.'); }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Sign in</h2>
        
        {successMsg && <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-3 rounded-md text-sm text-center font-medium">{successMsg}</div>}
        {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm text-center">{error}</div>}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Email address" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Password" />
          </div>
          <button type="submit" className="w-full py-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold transition shadow-lg">Sign In</button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Don't have an account? <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
