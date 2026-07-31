import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Register() {
  const navigate = useNavigate(); const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', address: '', role: 'CANDIDATE' });
  const [error, setError] = useState(''); const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setIsSubmitting(true);
    try {
      await api.post('/auth/register', formData);
      const response = await api.post('/auth/login', { email: formData.email, password: formData.password });
      const { token, userId, email: userEmail, role } = response.data;
      login({ userId, email: userEmail, role }, token);
      navigate(role === 'EMPLOYER' ? '/employer/dashboard' : '/candidate/dashboard');
    } catch (err) { setError(err.response?.data || 'Failed to register.'); setIsSubmitting(false); }
  };

  const inputClasses = "w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Create an Account</h2>
        {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClasses}>First Name *</label><input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Last Name *</label><input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Email Address *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Password *</label><input type="password" name="password" required value={formData.password} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Phone Number *</label><input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className={inputClasses} placeholder="+1 234 567 8900" /></div>
            <div><label className={labelClasses}>Address</label><input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClasses} placeholder="City, Country" /></div>
          </div>
          
          <div>
            <label className={labelClasses}>I am a... *</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 text-gray-900 dark:text-white">
              <option value="CANDIDATE">Candidate (Looking for jobs)</option>
              <option value="EMPLOYER">Employer (Hiring talent)</option>
            </select>
          </div>
          
          <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-lg transition shadow-lg">{isSubmitting ? 'Creating account...' : 'Sign Up Now'}</button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">Already have an account? <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Log in here</Link></p>
      </div>
    </div>
  );
}
