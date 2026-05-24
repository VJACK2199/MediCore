import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const PatientManagement = () => {
  const { patients, setPatients, doctors, appointments } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    email: '',
    phone: '',
    bloodGroup: 'O+',
    medicalHistory: '',
    address: '',
    status: 'Active'
  });

  const statusOptions = ['Active', 'Pending', 'In Process', 'Consulting', 'Emergency', 'Closed', 'Inactive'];
  const statusFilterOptions = ['All', ...statusOptions];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusCardClick = (status) => {
    setStatusFilter(status);
    setShowFilters(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPatient) {
      setPatients(patients.map(patient =>
        patient.id === editingPatient.id
          ? { ...patient, ...formData, id: editingPatient.id }
          : patient
      ));
      setEditingPatient(null);
    } else {
      const newPatient = {
        id: Date.now(),
        ...formData,
        lastVisit: new Date().toISOString().split('T')[0],
        status: formData.status || 'Active'
      };
      setPatients([...patients, newPatient]);
    }
    
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      email: '',
      phone: '',
      bloodGroup: 'O+',
      medicalHistory: '',
      address: '',
      status: 'Active'
    });
    setShowAddForm(false);
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      email: patient.email,
      phone: patient.phone,
      bloodGroup: patient.bloodGroup,
      medicalHistory: patient.medicalHistory,
      address: patient.address || '',
      status: patient.status || 'Active'
    });
    setShowAddForm(true);
  };

  const handleDelete = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(patient => patient.id !== patientId));
    }
  };

  const statusCounts = statusOptions.reduce((acc, status) => {
    acc[status] = patients.filter(p => p.status === status).length;
    return acc;
  }, {});

  const getAssignedDoctorName = (patientId) => {
    const patientAppointments = appointments
      .filter((appointment) => appointment.patientId === patientId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestAppointment = patientAppointments[0];
    if (!latestAppointment) {
      return 'Unassigned';
    }
    const doctor = doctors.find((doc) => doc.id === latestAppointment.doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  const getPatientStatusClass = (status) => {
    switch (status) {
      case 'Emergency':
        return 'bg-red-100 text-red-800';
      case 'Consulting':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Process':
        return 'bg-indigo-100 text-indigo-800';
      case 'Closed':
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary px-4 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => handleStatusCardClick(status)}
            className="card p-4 text-left text-left hover:shadow-lg transition-shadow duration-150"
          >
            <p className="text-sm font-medium text-gray-500">{status}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{statusCounts[status] || 0}</p>
            <p className="mt-2 text-xs text-gray-400">Filter by this status</p>
          </button>
        ))}
      </div>

      {/* Add/Edit Patient Form */}
      {showAddForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingPatient ? 'Edit Patient' : 'Add New Patient'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingPatient(null);
                setFormData({
                  name: '',
                  age: '',
                  gender: 'Male',
                  email: '',
                  phone: '',
                  bloodGroup: 'O+',
                  medicalHistory: '',
                  address: ''
                });
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  required
                  className="input"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  className="input"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group *
                </label>
                <select
                  className="input"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  className="input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History
              </label>
              <textarea
                className="input"
                rows={3}
                value={formData.medicalHistory}
                onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                placeholder="Enter patient's medical history..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="input"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter patient's address..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingPatient(null);
                }}
                className="btn btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2">
                {editingPatient ? 'Update Patient' : 'Add Patient'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="btn btn-secondary px-4 py-2"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Filter'}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="input w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusFilterOptions.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStatusFilter('All')}
                className="btn btn-secondary px-4 py-2"
              >
                Clear Filter
              </button>
              <div className="flex items-center text-sm text-gray-500">
                Showing {filteredPatients.length} of {patients.length} patients
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      {patient.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                      {patient.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{getAssignedDoctorName(patient.id)}</div>
                    <div className="text-sm text-gray-500">Doctor assigned</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Blood: {patient.bloodGroup}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {patient.medicalHistory || 'No history recorded'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {patient.lastVisit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPatientStatusClass(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;
