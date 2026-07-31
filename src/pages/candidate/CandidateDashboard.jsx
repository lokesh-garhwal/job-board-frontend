import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function CandidateDashboard() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      api.get(`/applications/candidate/${user.userId}`).then(res => setApplications(res.data)).catch(err => console.error(err));
    }
  }, [user]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'SHORTLISTED': return <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">Shortlisted</span>;
      case 'REJECTED': return <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold">Rejected</span>;
      default: return <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">Applied</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white">Candidate Dashboard</h1>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Your Applications</h3>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700 overflow-hidden">
        {applications.length === 0 ? <p className="text-gray-500 dark:text-gray-400 text-center py-4">You haven't applied to any jobs yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="p-4 text-sm font-bold text-gray-700 dark:text-gray-300 rounded-tl-lg">Job Title</th>
                  <th className="p-4 text-sm font-bold text-gray-700 dark:text-gray-300">Company</th>
                  <th className="p-4 text-sm font-bold text-gray-700 dark:text-gray-300 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{app.job?.title}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{app.job?.company?.name}</td>
                    <td className="p-4">{getStatusBadge(app.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}