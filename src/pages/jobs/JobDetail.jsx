import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function JobDetail() {
  const { jobId } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);

  useEffect(() => { api.get(`/jobs/${jobId}`).then(res => setJob(res.data)).catch(err => console.error(err)); }, [jobId]);

  if (!job) return <div className="text-center py-20 text-gray-500 dark:text-gray-400">Loading details...</div>;

  const isEmployerOwner = user?.role === 'EMPLOYER' && job.company?.employer?.id === user?.userId;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/jobs" className="text-blue-600 dark:text-blue-400 hover:underline font-medium mb-6 inline-block">← Back to Jobs</Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-900 dark:bg-gray-950 px-8 py-10 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold mb-2 text-white">{job.title}</h1>
              <p className="text-xl text-gray-400">{job.company?.name}</p>
            </div>
            {isEmployerOwner && (
              <Link to={`/employer/edit-job/${job.id}`} className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-200">Edit Job</Link>
            )}
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg"><p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Location</p><p className="font-semibold text-blue-900 dark:text-blue-300">{job.location}</p></div>
            <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg"><p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Salary Range</p><p className="font-semibold text-green-900 dark:text-green-300">${job.salaryMin} - ${job.salaryMax}</p></div>
            <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg"><p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Status</p><p className="font-semibold text-purple-900 dark:text-purple-300">{job.status}</p></div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h3>
          <div className="prose max-w-none text-gray-600 dark:text-gray-300 mb-10 whitespace-pre-wrap">
            {job.description}
          </div>

          {!isEmployerOwner && user?.role !== 'EMPLOYER' && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600 text-center">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Interested in this role?</h4>
              <Link to={`/jobs/apply/${job.id}`} className="inline-block w-full md:w-auto bg-blue-600 dark:bg-blue-500 text-white font-bold py-3 px-10 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition shadow-lg">Apply Now</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}