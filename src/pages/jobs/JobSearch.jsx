import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/jobs').then(res => setJobs(res.data)).catch(err => console.error(err)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Discover Your Next Opportunity</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Browse the latest jobs available across top companies.</p>
      </div>

      {loading ? <div className="text-center text-gray-500 dark:text-gray-400">Loading jobs...</div> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.length === 0 ? <p className="text-gray-500 dark:text-gray-400 col-span-3 text-center">No jobs posted yet.</p> : jobs.map(job => (
            <div key={job.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition duration-300 flex flex-col h-full overflow-hidden">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase">{job.location}</span>
                  <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">Active</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">{job.company?.name || 'Unknown Company'}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                  <span className="mr-4">💰 ${job.salaryMin} - ${job.salaryMax}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">{job.description}</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <Link to={`/jobs/${job.id}`} className="block w-full text-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}