import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyStatus, setApplyStatus] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Job not found');
        return res.json();
      })
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'CANDIDATE') {
      setApplyStatus('Only candidates can apply for jobs.');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/applications/apply/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) throw new Error('Failed to submit application.');
      
      const data = await res.json();
      setApplyStatus(data.message || 'Application submitted successfully!');
    } catch (err) {
      setApplyStatus('Error: Could not submit application.');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading job details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!job) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {/* Header Header */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 gap-4 text-sm font-medium">
              <span>🏢 {job.company?.name || 'Independent Employer'}</span>
              <span>📍 {job.location || 'Remote'}</span>
            </div>
          </div>
          <button 
            onClick={handleApply}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition w-full md:w-auto"
          >
            Apply Now
          </button>
        </div>

        {/* Application Status Message */}
        {applyStatus && (
          <div className={`p-4 text-center font-medium ${applyStatus.includes('successfully') ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'}`}>
            {applyStatus}
          </div>
        )}

        {/* Job Description */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h3>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {job.description}
          </div>
        </div>

      </div>
    </div>
  );
}
