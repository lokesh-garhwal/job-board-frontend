import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/jobs/employer/my-jobs', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Employer Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your active job postings and review candidates.</p>
        </div>
        <Link to="/employer/post-job" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition">
          + Post a New Job
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Your Active Job Postings</h3>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading your jobs...</div>
        ) : jobs.length > 0 ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {jobs.map((job, index) => (
              <li key={job.id || index} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">📍 {job.location} {job.salaryMin && job.salaryMax ? `• 💰 $${job.salaryMin} - $${job.salaryMax}` : ''}</p>
                </div>
                <div className="flex space-x-3">
                  <Link to={`/employer/job/${job.id}/applicants`} className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 rounded transition font-medium">View Applicants</Link>
                  <button className="px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 rounded transition font-medium">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs posted yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by creating your first job listing to attract candidates.</p>
            <Link to="/employer/post-job" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Create your first job &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
