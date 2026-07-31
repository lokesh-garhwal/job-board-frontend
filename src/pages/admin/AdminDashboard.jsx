import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, status: 'Loading...' });
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]); 

  const fetchDashboardData = () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    fetch('http://localhost:8080/api/admin/stats', { headers })
      .then(res => {
        if (!res.ok) throw new Error('Failed stats');
        return res.json();
      })
      .then(data => setStats(data))
      .catch(() => setStats({ users: 'Error', jobs: 'Error', status: 'Offline' }));

    fetch('http://localhost:8080/api/admin/users', { headers })
      .then(res => {
        if (!res.ok) throw new Error('Failed users');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => console.error(err));

    fetch('http://localhost:8080/api/admin/jobs', { headers })
      .then(res => {
        if (!res.ok) throw new Error('Failed jobs');
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) fetchDashboardData(); 
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admin/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) fetchDashboardData(); 
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Admin Control Panel</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome back, Administrator. Manage your platform, users, and job postings below.</p>
      </div>
      
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Users</h3>
          <p className="mt-2 text-4xl font-extrabold text-blue-600 dark:text-blue-400">{stats.users}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Jobs</h3>
          <p className="mt-2 text-4xl font-extrabold text-blue-600 dark:text-blue-400">{stats.jobs}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">System Status</h3>
          <p className="mt-2 text-2xl font-bold text-green-500 dark:text-green-400">{stats.status}</p>
        </div>
      </div>

      {/* USER MANAGEMENT TABLE */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">User Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((u, i) => (
                <tr key={u.id || i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        u.role === 'ADMIN' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        u.role === 'EMPLOYER' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {u.role !== 'ADMIN' && (
                      <button onClick={() => handleDeleteUser(u.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JOB MANAGEMENT TABLE */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Job Postings Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.length > 0 ? jobs.map((job, i) => (
                <tr key={job.id || i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  {/* Safely fetch standard job string properties */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{job.title || job.name || 'Untitled'}</td>
                  
                  {/* FIX IS HERE: Add ?.name to safely extract the string from the company object */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{job.company?.name || 'N/A'}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">No jobs posted yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}