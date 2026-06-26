import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user, createUser, users, deleteUser } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = (users || []).filter(u => {
    const q = String(search || '').trim().toLowerCase();
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch = !q || (u.name && u.name.toLowerCase().includes(q)) || (u.email && u.email.toLowerCase().includes(q));
    return matchesRole && matchesSearch;
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (user.role !== 'admin') {
      setError('Only administrators can create users here.');
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      createUser(user, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        permissions: formData.role === 'doctor' ? ['patients', 'appointments', 'schedule'] : ['patients', 'appointments', 'billing']
      });
      setSuccess('User created successfully.');
      setFormData({ name: '', email: '', password: '', role: 'staff' });
    } catch (err) {
      setError(err.message || 'Failed to create user.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage system settings and user accounts.</p>
      </div>

      <div className="card p-6 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Create User (Admin only)</h2>
        {error && <div className="mb-3 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>}
        {success && <div className="mb-3 text-sm text-green-700 bg-green-50 p-3 rounded">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} type="email" className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} type="password" className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={formData.role} onChange={(e)=>setFormData({...formData,role:e.target.value})} className="input w-full">
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end mt-2">
            <button className="btn btn-primary px-4 py-2" type="submit">Create User</button>
          </div>
        </form>

        <div className="mt-6 border-t pt-6">
          <h3 className="text-md font-medium mb-3">User Management</h3>
          <p className="text-sm text-gray-600 mb-4">Total users: <strong>{users ? users.length : 0}</strong> — Showing <strong>{filteredUsers.length}</strong></p>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <input
                  placeholder="Search name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input w-full"
                />
              </div>
              <div className="w-full sm:w-48">
                <select value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value)} className="input w-full">
                  <option value="all">All roles</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-600">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers && filteredUsers.length ? filteredUsers.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="py-3">{u.name}</td>
                    <td className="py-3 text-gray-700">{u.email}</td>
                    <td className="py-3">{u.role}</td>
                    <td className="py-3">
                      {user && user.role === 'admin' ? (
                        <button
                          className="btn btn-danger px-3 py-1 text-sm"
                          onClick={() => {
                            try {
                              deleteUser(user, u.id);
                              setSuccess('User deleted.');
                              setError('');
                            } catch (err) {
                              setError(err.message || 'Failed to delete user.');
                            }
                          }}
                        >Delete</button>
                      ) : (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-sm text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
