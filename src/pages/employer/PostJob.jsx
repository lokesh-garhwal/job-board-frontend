import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function PostJob() {
  const { user } = useContext(AuthContext); const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', location: '', salaryMin: '', salaryMax: '', jobType: 'FULL_TIME' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await api.post(`/jobs/employer/${user.userId}`, formData); navigate('/employer/dashboard'); } 
    catch (err) { alert('Failed to post the job.'); }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Post a New Job</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Title *</label><input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Description *</label><textarea rows="5" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location</label><input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Minimum Salary ($)</label><input type="number" value={formData.salaryMin} onChange={e => setFormData({...formData, salaryMin: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" /></div>
            <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Maximum Salary ($)</label><input type="number" value={formData.salaryMax} onChange={e => setFormData({...formData, salaryMax: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" /></div>
          </div>
          <button type="submit" className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition">Post Job</button>
        </form>
      </div>
    </div>
  );
}