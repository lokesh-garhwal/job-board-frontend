import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', address: '', bio: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => { if (user?.userId) api.get(`/users/${user.userId}`).then(res => setProfile(res.data)); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await api.put(`/users/${user.userId}`, profile); setSuccess(true); setTimeout(() => setSuccess(false), 3000); } 
    catch (err) { alert('Failed to update profile'); }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 h-32"></div>
        <div className="px-8 pb-8">
          <div className="relative -top-12 flex justify-between items-end mb-4">
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400">
                {profile.firstName ? profile.firstName.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Personal Information</h1>
          {success && <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 p-4 mb-6 rounded-lg font-medium">Profile updated successfully!</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label><input type="text" value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" required /></div>
              <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label><input type="text" value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" required /></div>
              <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email (Read Only)</label><input type="email" value={profile.email} disabled className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed" /></div>
              <div><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label><input type="tel" value={profile.phoneNumber} onChange={e => setProfile({...profile, phoneNumber: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" required /></div>
              <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Address</label><input type="text" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Professional Bio</label><textarea rows="4" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Experience..." /></div>
            </div>
            <button type="submit" className="w-full bg-gray-900 dark:bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-blue-500 transition shadow-lg">Save Profile Settings</button>
          </form>
        </div>
      </div>
    </div>
  );
}