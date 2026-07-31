import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function ApplyJob() {
  const { jobId } = useParams(); const navigate = useNavigate(); const { user } = useContext(AuthContext);
  const [resumeUrl, setResumeUrl] = useState(''); const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    try { await api.post('/applications/apply', { jobId, candidateId: user.userId, resumeUrl }); navigate('/candidate/dashboard'); } 
    catch (err) { alert('Failed to submit application.'); setIsSubmitting(false); }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Submit Your Application</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Resume Link (Google Drive, Dropbox) *</label>
            <input type="url" required value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="https://drive.google.com/..." />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-700">
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}