import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      // Convert salary strings to numbers before sending to match BigDecimal
      const payload = {
        ...formData,
        salaryMin: formData.salaryMin ? parseFloat(formData.salaryMin) : null,
        salaryMax: formData.salaryMax ? parseFloat(formData.salaryMax) : null,
      };

      const res = await fetch('http://localhost:8080/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload) 
      });

      if (!res.ok) throw new Error('Failed to post the job. Please check your inputs.');
      
      setSuccess('Job posted successfully!');
      setTimeout(() => navigate('/employer/dashboard'), 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Post a New Job</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Fill out the details below to attract top talent to your company.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">{error}</div>}
          {success && <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm">{success}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior React Developer" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote, New York, NY" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Salary ($)</label>
              <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} placeholder="e.g. 80000" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maximum Salary ($)</label>
              <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} placeholder="e.g. 120000" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows="6" placeholder="Describe the responsibilities and requirements..." className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="button" onClick={() => navigate(-1)} className="mr-4 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-md transition disabled:opacity-50">
              {loading ? 'Posting...' : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
