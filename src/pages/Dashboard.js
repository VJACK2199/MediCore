import React from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  Bed,
  TrendingUp,
  TrendingDown,
  Plus,
  Activity,
  Pill,
  FlaskConical
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const { patients, doctors, appointments, medicines, beds } = useData();
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total Patients',
      value: patients.length,
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'primary',
      link: '/patients'
    },
    {
      title: 'Appointments Today',
      value: appointments.filter(apt => apt.status === 'confirmed').length,
      change: '+5%',
      changeType: 'increase',
      icon: Calendar,
      color: 'secondary',
      link: '/appointments'
    },
    {
      title: 'Available Doctors',
      value: doctors.filter(doc => doc.available).length,
      change: '-2%',
      changeType: 'decrease',
      icon: Stethoscope,
      color: 'primary',
      link: '/doctors'
    },
    {
      title: 'Available Beds',
      value: beds.filter(bed => bed.status === 'available').length,
      change: '+8%',
      changeType: 'increase',
      icon: Bed,
      color: 'secondary',
      link: '/beds'
    }
  ];

  const patientTrendsData = [
    { month: 'Jan', patients: 120, appointments: 85 },
    { month: 'Feb', patients: 135, appointments: 92 },
    { month: 'Mar', patients: 142, appointments: 98 },
    { month: 'Apr', patients: 158, appointments: 105 },
    { month: 'May', patients: 165, appointments: 112 },
    { month: 'Jun', patients: 178, appointments: 125 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, costs: 32000 },
    { month: 'Feb', revenue: 52000, costs: 35000 },
    { month: 'Mar', revenue: 48000, costs: 33000 },
    { month: 'Apr', revenue: 61000, costs: 38000 },
    { month: 'May', revenue: 58000, costs: 36000 },
    { month: 'Jun', revenue: 65000, costs: 40000 }
  ];

  const recentAppointments = appointments.slice(0, 5);
  const lowStockMedicines = medicines.filter(med => med.stock < 100);
  const upcomingAppointments = appointments.filter(apt => apt.status === 'confirmed').slice(0, 3);

  const quickActions = [
    {
      title: 'Add New Patient',
      description: 'Register a new patient in the system',
      icon: Users,
      color: 'primary',
      action: () => console.log('Add patient')
    },
    {
      title: 'Schedule Appointment',
      description: 'Book an appointment with a doctor',
      icon: Calendar,
      color: 'secondary',
      action: () => console.log('Schedule appointment')
    },
    {
      title: 'Add Medicine',
      description: 'Update pharmacy inventory',
      icon: Pill,
      color: 'primary',
      action: () => console.log('Add medicine')
    },
    {
      title: 'Lab Test Request',
      description: 'Request laboratory tests',
      icon: FlaskConical,
      color: 'secondary',
      action: () => console.log('Lab test')
    }
  ];

  return (
    <div className="w-full">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-primary-100 text-lg mb-8">
          Here's what's happening at your hospital today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">{patients.length}</p>
            <p className="text-primary-100 text-sm">Total Patients</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">{appointments.filter(apt => apt.status === 'confirmed').length}</p>
            <p className="text-primary-100 text-sm">Today's Appointments</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">{doctors.filter(doc => doc.available).length}</p>
            <p className="text-primary-100 text-sm">Available Doctors</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">{beds.filter(bed => bed.status === 'available').length}</p>
            <p className="text-primary-100 text-sm">Available Beds</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="card p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <div className="flex items-center mt-2">
                    {card.changeType === 'increase' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`h-12 w-12 bg-${card.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${card.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Patient Trends Chart */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Patient Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={patientTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="appointments" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
              <Bar dataKey="costs" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
              >
                <div className={`h-10 w-10 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 text-${action.color}-600`} />
                </div>
                <h4 className="font-medium text-gray-900">{action.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Recent Appointments */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Appointments</h3>
          <div className="space-y-3">
            {recentAppointments.map((appointment, index) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const doctor = doctors.find(d => d.id === appointment.doctorId);
              return (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{patient?.name}</p>
                    <p className="text-xs text-gray-500">Dr. {doctor?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{appointment.time}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Low Stock Alerts</h3>
          <div className="space-y-3">
            {lowStockMedicines.length > 0 ? (
              lowStockMedicines.map((medicine, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{medicine.name}</p>
                    <p className="text-xs text-gray-500">{medicine.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      {medicine.stock} {medicine.unit}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">All medicines are well stocked</p>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Today's Schedule</h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment, index) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const doctor = doctors.find(d => d.id === appointment.doctorId);
              return (
                <div key={index} className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-0">
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-700">
                      {appointment.time.split(':')[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{patient?.name}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
