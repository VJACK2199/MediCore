import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import {
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Activity,
  FileText,
  Pill,
  Download,
  Plus,
  Edit,
  ArrowLeft,
  Heart,
  AlertTriangle
} from 'lucide-react';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, appointments, medicines } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  const patient = patients.find(p => p.id === parseInt(id));
  
  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Not Found</h2>
        <button
          onClick={() => navigate('/patients')}
          className="btn btn-primary"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  const patientAppointments = appointments.filter(apt => apt.patientId === patient.id);
  
  const medicalRecords = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'General Checkup',
      doctor: 'Dr. Emily Chen',
      diagnosis: 'Hypertension under control',
      prescription: 'Continue current medication',
      notes: 'Blood pressure: 120/80 mmHg'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'Follow-up',
      doctor: 'Dr. Robert Wilson',
      diagnosis: 'Diabetes Type 2 - stable',
      prescription: 'Metformin 500mg twice daily',
      notes: 'Blood sugar levels within normal range'
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medicine: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '30 days',
      prescribedBy: 'Dr. Robert Wilson',
      date: '2024-01-10'
    },
    {
      id: 2,
      medicine: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      prescribedBy: 'Dr. Emily Chen',
      date: '2024-01-15'
    }
  ];

  const labResults = [
    {
      id: 1,
      test: 'Complete Blood Count',
      date: '2024-01-12',
      status: 'Normal',
      doctor: 'Dr. Emily Chen'
    },
    {
      id: 2,
      test: 'HbA1c',
      date: '2024-01-10',
      status: 'Borderline',
      doctor: 'Dr. Robert Wilson'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/patients')}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Profile</h1>
            <p className="text-gray-600">View and manage patient information</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-secondary px-4 py-2">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
          <button className="btn btn-primary px-4 py-2">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Appointment
          </button>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center">
              <Users className="h-10 w-10 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {patient.age} years old, {patient.gender}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {patient.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {patient.address || 'Address not provided'}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-500">Blood Group:</span>
                <span className="ml-2 font-medium text-gray-900">{patient.bloodGroup}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {patient.status}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Last Visit:</span>
                <span className="ml-2 font-medium text-gray-900">{patient.lastVisit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-4">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Medical History</p>
              <p className="text-lg font-semibold text-gray-900">{patient.medicalHistory || 'None recorded'}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-lg font-semibold text-gray-900">{patientAppointments.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Active Prescriptions</p>
              <p className="text-lg font-semibold text-gray-900">{prescriptions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'medical-records', 'prescriptions', 'lab-results'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {patientAppointments.slice(0, 3).map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.type}</p>
                      <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical-records' && (
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
                <button className="btn btn-primary px-4 py-2 text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medicalRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.doctor}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.diagnosis}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Prescriptions</h3>
                <button className="btn btn-primary px-4 py-2 text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prescription
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescribed By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prescriptions.map((prescription) => (
                    <tr key={prescription.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 mr-2 text-primary-500" />
                          {prescription.medicine}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prescription.dosage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prescription.frequency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prescription.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prescription.prescribedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'lab-results' && (
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Laboratory Results</h3>
                <button className="btn btn-primary px-4 py-2 text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Test
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {labResults.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary-500" />
                          {result.test}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          result.status === 'Normal' 
                            ? 'bg-green-100 text-green-800'
                            : result.status === 'Borderline'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.doctor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
