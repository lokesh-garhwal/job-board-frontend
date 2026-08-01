import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch jobs", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Explore Opportunities</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Find your dream job from top companies around the world.</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading jobs...</div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={job.id || index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-4">{job.company?.name || 'Independent Employer'}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <span className="mr-4">📍 {job.location || 'Remote'}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6">
                  {job.description}
                </p>
              </div>
              <Link to={`/jobs/${job.id}`} className="w-full py-2 block text-center bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg transition border border-gray-200 dark:border-gray-600">
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No jobs available right now</h3>
          <p className="text-gray-500">Check back later for new opportunities!</p>
        </div>
      )}
    </div>
  );
}
