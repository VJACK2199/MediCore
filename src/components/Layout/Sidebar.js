import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  Pill,
  FlaskConical,
  Bed,
  Menu,
  X,
  Settings,
  LogOut,
  IndianRupeeIcon,
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'staff', 'pharmacist'] },
    { name: 'Patients', href: '/patients', icon: Users, roles: ['admin', 'doctor', 'staff', 'pharmacist'] },
    { name: 'Doctors', href: '/doctors', icon: Stethoscope, roles: ['admin'] },
    { name: 'Appointments', href: '/appointments', icon: Calendar, roles: ['admin', 'doctor', 'staff'] },
    { name: 'Hospital Billing', href: '/hospital-billing', icon: IndianRupeeIcon, roles: ['admin', 'doctor'] },
    { name: 'Pharmacy Billing', href: '/pharmacy-billing', icon: Pill, roles: ['admin', 'doctor', 'pharmacist'] },
    { name: 'Pharmacy', href: '/pharmacy', icon: FlaskConical, roles: ['admin', 'staff', 'pharmacist'] },
    { name: 'Laboratory', href: '/laboratory', icon: FlaskConical, roles: ['admin', 'doctor', 'staff'] },
    { name: 'Bed Management', href: '/beds', icon: Bed, roles: ['admin', 'staff'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin', 'staff', 'pharmacist'] },
    // { name: 'logout', href: '', icon: logout, roles: ['admin', 'staff', 'doctor'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  );

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Akruti</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-2">
            {/* <Link
              to="/settings"
              className="sidebar-item w-full"
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link> */}
            <button
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              className="sidebar-item w-full text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
