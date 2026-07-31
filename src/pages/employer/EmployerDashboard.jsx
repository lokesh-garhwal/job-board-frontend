import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => { fetchDashboardData(); }, [user]);

  const fetchDashboardData = () => {
    if (user?.userId) {
      api.get(`/jobs/employer/${user.userId}`).then(res => setJobs(res.data)).catch(err => console.error(err));
      api.get(`/applications/employer/${user.userId}`).then(res => setApplications(res.data)).catch(err => console.error(err));
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try { await api.put(`/applications/${appId}/status`, { status: newStatus }); fetchDashboardData(); } 
    catch (err) { alert("Failed to update status."); }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'SHORTLISTED': return <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">Shortlisted</span>;
      default: return <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">Applied</span>;
    }
  };

  // NEW: Filter out rejected candidates so they disappear
  const activeApplications = applications.filter(app => app.status !== 'REJECTED');

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Employer Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your active listings and review top candidates.</p>
        </div>
        <Link to="/employer/post-job" className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition">
          + Post New Job
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <span className="bg-blue-600 w-2 h-6 rounded mr-3"></span> Your Active Jobs
          </h3>
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl text-center border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">You haven't posted any jobs yet.</p>
              </div>
            ) : jobs.map(job => (
              <div key={job.id} className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
                  <Link to={`/employer/edit-job/${job.id}`} className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-md">Edit</Link>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <span className="bg-indigo-600 w-2 h-6 rounded mr-3"></span> Active Applications
          </h3>
          <div className="space-y-4">
            {activeApplications.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl text-center border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">No active applicants to review.</p>
              </div>
            ) : activeApplications.map(app => (
              <div key={app.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 border-l-4 border-blue-500 dark:border-blue-400 flex flex-col sm:flex-row justify-between items-start sm:items-center transition hover:shadow-md">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{app.candidate?.firstName} {app.candidate?.lastName}</h4>
                    {getStatusBadge(app.status)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Applied for: <span className="font-semibold text-gray-900 dark:text-gray-100">{app.job?.title}</span></p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Phone: {app.candidate?.phoneNumber}</p>
                </div>
                <div className="flex flex-col space-y-2 w-full sm:w-auto">
                  <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    View Resume
                  </a>
                  {app.status === 'APPLIED' && (
                    <div className="flex space-x-2">
                      <button onClick={() => handleUpdateStatus(app.id, 'SHORTLISTED')} className="flex-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-3 py-2 rounded-lg text-sm font-bold hover:bg-green-100 dark:hover:bg-green-900/40 transition">
                        Shortlist
                      </button>
                      <button onClick={() => handleUpdateStatus(app.id, 'REJECTED')} className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}