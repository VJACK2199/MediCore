import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Lock, Mail, Stethoscope, Building, Users, Pill } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Define valid credentials for each role
      const validCredentials = {
        admin: {
          email: 'admin@akruti.com',
          password: 'admin123',
          name: 'Admin User',
          permissions: ['all']
        },
        doctor: {
          email: 'doctor@akruti.com',
          password: 'doctor123',
          name: 'Dr. John Doe',
          permissions: ['patients', 'appointments', 'schedule']
        },
        staff: {
          email: 'staff@akruti.com',
          password: 'staff123',
          name: 'Staff User',
          permissions: ['patients', 'appointments', 'billing']
        },
        pharmacist: {
          email: 'pharmacist@akruti.com',
          password: 'pharmacist123',
          name: 'Pharmacy Manager',
          permissions: ['pharmacy', 'billing', 'inventory']
        }
      };

      const credentials = validCredentials[formData.role];
      
      // Validate both email and password
      if (formData.email === credentials.email && formData.password === credentials.password) {
        const userData = {
          id: formData.role === 'admin' ? 1 : formData.role === 'doctor' ? 2 : formData.role === 'staff' ? 3 : 4,
          name: credentials.name,
          email: formData.email,
          role: formData.role,
          permissions: credentials.permissions
        };
        
        login(userData);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Akruti
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hospital & Clinic Management System
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.role === 'admin'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'doctor' })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.role === 'doctor'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Doctor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'staff' })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.role === 'staff'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Users className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Staff</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'pharmacist' })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.role === 'pharmacist'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Pill className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Pharmacist</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
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
                  placeholder={formData.role === 'admin' ? 'admin@akruti.com' : formData.role === 'doctor' ? 'doctor@akruti.com' : formData.role === 'staff' ? 'staff@akruti.com' : 'pharmacist@akruti.com'}
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
                  placeholder={formData.role === 'admin' ? 'admin123' : formData.role === 'doctor' ? 'doctor123' : formData.role === 'staff' ? 'staff123' : 'pharmacist123'}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-base"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
