import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import JobApplicants from './pages/employer/JobApplicants';
import PostJob from './pages/employer/PostJob';
import EditJob from './pages/employer/EditJob';
import JobSearch from './pages/jobs/JobSearch';
import JobDetail from './pages/jobs/JobDetail';
import ApplyJob from './pages/jobs/ApplyJob';
import Profile from './pages/profile/Profile';
import JobFeed from './pages/jobs/JobFeed';
import JobDetails from './pages/jobs/JobDetails';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/jobs/:jobId" element={<JobDetail />} /> 
              
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/jobs/apply/:jobId" element={<ProtectedRoute allowedRoles={['CANDIDATE']}><ApplyJob /></ProtectedRoute>} />
              <Route path="/candidate/dashboard" element={<ProtectedRoute allowedRoles={['CANDIDATE']}><CandidateDashboard /></ProtectedRoute>} />
              
              <Route path="/employer/dashboard" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><EmployerDashboard /></ProtectedRoute>} />
              <Route path="/employer/post-job" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJob /></ProtectedRoute>} />
              <Route path="/employer/edit-job/:jobId" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><EditJob /></ProtectedRoute>} />
            <Route path="/jobs" element={<JobFeed />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}