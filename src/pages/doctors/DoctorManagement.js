import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import {
  Stethoscope,
  Plus,
  Search,
  Edit,
  Calendar,
  Mail,
  Phone,
  Clock,
  Users,
  Star,
  Filter
} from 'lucide-react';

const DoctorManagement = () => {
  const { doctors, setDoctors } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    email: '',
    phone: '',
    available: true,
    schedule: '',
    education: '',
    certifications: ''
  });

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingDoctor) {
      setDoctors(doctors.map(doctor =>
        doctor.id === editingDoctor.id
          ? { ...doctor, ...formData, experience: parseInt(formData.experience), patients: editingDoctor.patients }
          : doctor
      ));
      setEditingDoctor(null);
    } else {
      const newDoctor = {
        id: Date.now(),
        ...formData,
        experience: parseInt(formData.experience),
        patients: 0,
        schedule: formData.schedule.split(',').map(s => s.trim())
      };
      setDoctors([...doctors, newDoctor]);
    }
    
    setFormData({
      name: '',
      specialization: '',
      experience: '',
      email: '',
      phone: '',
      available: true,
      schedule: '',
      education: '',
      certifications: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience.toString(),
      email: doctor.email,
      phone: doctor.phone,
      available: doctor.available,
      schedule: doctor.schedule.join(', '),
      education: doctor.education || '',
      certifications: doctor.certifications || ''
    });
    setShowAddForm(true);
  };

  const toggleAvailability = (doctorId) => {
    setDoctors(doctors.map(doctor =>
      doctor.id === doctorId
        ? { ...doctor, available: !doctor.available }
        : doctor
    ));
  };

  const specializations = ['Cardiology', 'General Medicine', 'Pediatrics', 'Orthopedics', 'Neurology', 'Dermatology', 'Psychiatry', 'Surgery'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-600">Manage doctor profiles and schedules</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary px-4 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Doctor
        </button>
      </div>

      {/* Add/Edit Doctor Form */}
      {showAddForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingDoctor(null);
                setFormData({
                  name: '',
                  specialization: '',
                  experience: '',
                  email: '',
                  phone: '',
                  available: true,
                  schedule: '',
                  education: '',
                  certifications: ''
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
                  Specialization *
                </label>
                <select
                  className="input"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  required
                  className="input"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule (comma separated)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Mon-Fri: 9AM-5PM, Sat: 9AM-1PM"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., MBBS, MD, etc."
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Board Certified, etc."
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              />
              <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                Available for appointments
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingDoctor(null);
                }}
                className="btn btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2">
                {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
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
              placeholder="Search doctors by name, specialization, or email..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary px-4 py-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialization}</p>
                </div>
              </div>
              <button
                onClick={() => toggleAvailability(doctor.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  doctor.available ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    doctor.available ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                {doctor.experience} years experience
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {doctor.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {doctor.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {doctor.schedule.join(', ')}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                {doctor.patients} patients
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                doctor.available 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {doctor.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(doctor)}
                className="flex-1 btn btn-secondary py-2 text-sm"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button className="flex-1 btn btn-primary py-2 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorManagement;
