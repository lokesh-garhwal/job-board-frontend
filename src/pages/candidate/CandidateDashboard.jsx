import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/applications/my-applications', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Candidate Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your job applications and manage your career journey.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Your Applications</h3>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading your applications...</div>
        ) : applications.length > 0 ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {applications.map((app, index) => (
              <li key={app.id || index} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{app.job?.title || 'Unknown Job'}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">🏢 {app.job?.company?.name || 'Unknown Company'}</p>
                </div>
                <div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                    {app.status || 'PENDING'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">You haven't applied to any jobs yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start exploring opportunities to land your dream role.</p>
            <Link to="/jobs" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
              Explore Jobs &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
