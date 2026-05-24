import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Stethoscope, Building, User, Users } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const found = await login({ email: formData.email, password: formData.password });
      if (found.role !== formData.role) {
        setError('Selected role does not match your account role.');
        setLoading(false);
        return;
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to Akruti</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Hospital & Clinic Management System</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sign in as</label>
              <div className="flex gap-3 mb-3 justify-center">
                <button
                  type="button"
                  aria-label="Sign in as Admin"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`w-28 h-12 flex flex-col items-center justify-center rounded-lg border-2 transition-all ${formData.role === 'admin' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                  <Building className="h-5 w-5" />
                  <span className="text-xs mt-1">Admin</span>
                </button>

                <button
                  type="button"
                  aria-label="Sign in as Doctor"
                  onClick={() => setFormData({ ...formData, role: 'doctor' })}
                  className={`w-28 h-12 flex flex-col items-center justify-center rounded-lg border-2 transition-all ${formData.role === 'doctor' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                  <User className="h-5 w-5" />
                  <span className="text-xs mt-1">Doctor</span>
                </button>

                <button
                  type="button"
                  aria-label="Sign in as Staff"
                  onClick={() => setFormData({ ...formData, role: 'staff' })}
                  className={`w-28 h-12 flex flex-col items-center justify-center rounded-lg border-2 transition-all ${formData.role === 'staff' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                  <Users className="h-5 w-5" />
                  <span className="text-xs mt-1">Staff</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input pl-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 text-base">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-600">Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
