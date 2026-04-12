import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Upload, 
  Stethoscope,
  MapPin,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Activity,
  ArrowLeft
} from 'lucide-react';

const PatientAppointment = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    symptoms: '',
    problemDescription: '',
    preferredDoctor: '',
    appointmentDate: '',
    appointmentTime: '',
    urgency: 'normal'
  });

  const [uploadedReports, setUploadedReports] = useState([]);
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);

  // Sample available doctors
  const availableDoctors = [
    { id: 1, name: 'Dr. Emily Chen', specialization: 'General Medicine', experience: '10 years' },
    { id: 2, name: 'Dr. Robert Wilson', specialization: 'Emergency Medicine', experience: '8 years' },
    { id: 3, name: 'Dr. Maria Garcia', specialization: 'Surgery', experience: '15 years' },
    { id: 4, name: 'Dr. Sarah Johnson', specialization: 'Pediatrics', experience: '12 years' },
    { id: 5, name: 'Dr. Michael Brown', specialization: 'Cardiology', experience: '20 years' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newReports = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      uploadDate: new Date().toLocaleDateString()
    }));
    setUploadedReports([...uploadedReports, ...newReports]);
  };

  const removeReport = (reportId) => {
    setUploadedReports(uploadedReports.filter(report => report.id !== reportId));
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    // In a real app, this would save to database and send notifications
    console.log('Appointment submitted:', { ...formData, reports: uploadedReports });
    setAppointmentSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      symptoms: '',
      problemDescription: '',
      preferredDoctor: '',
      appointmentDate: '',
      appointmentTime: '',
      urgency: 'normal'
    });
    setUploadedReports([]);
    setAppointmentSubmitted(false);
  };

  if (appointmentSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Requested!</h2>
            <p className="text-gray-600 mb-8">
              Your appointment has been successfully submitted. We'll send you a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Appointment Details:</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Date:</span> {formData.appointmentDate}</p>
                <p><span className="font-medium">Time:</span> {formData.appointmentTime}</p>
                <p><span className="font-medium">Doctor:</span> {formData.preferredDoctor || 'To be assigned'}</p>
                <p><span className="font-medium">Patient:</span> {formData.patientName}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={resetForm} className="btn btn-primary">
                Book Another Appointment
              </button>
              <Link to="/patient-portal" className="btn btn-secondary">
                Back to Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Akruti Patient Portal</span>
            </div>
            <Link to="/patient-portal" className="btn btn-secondary flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Medical Appointment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Schedule your appointment with Akruti Hospital. Choose your preferred doctor and get the care you need.
          </p>
        </div>

        <form onSubmit={handleSubmitAppointment} className="space-y-8">
          {/* Patient Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="h-6 w-6 mr-2 text-blue-600" />
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  required
                  className="input"
                  placeholder="Enter your full name"
                  value={formData.patientName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="1"
                  max="120"
                  className="input"
                  placeholder="25"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select name="gender" required className="input" value={formData.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-blue-600" />
              Medical Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms *
                </label>
                <textarea
                  name="symptoms"
                  required
                  className="input"
                  rows="3"
                  placeholder="Describe your symptoms (e.g., fever, headache, cough, pain)"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem Description *
                </label>
                <textarea
                  name="problemDescription"
                  required
                  className="input"
                  rows="4"
                  placeholder="Please describe your medical problem in detail"
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select name="urgency" required className="input" value={formData.urgency} onChange={handleInputChange}>
                  <option value="normal">Normal - Routine checkup</option>
                  <option value="urgent">Urgent - Need attention soon</option>
                  <option value="emergency">Emergency - Need immediate attention</option>
                </select>
              </div>
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Stethoscope className="h-6 w-6 mr-2 text-blue-600" />
              Select Doctor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableDoctors.map((doctor) => (
                <label key={doctor.id} className="relative">
                  <input
                    type="radio"
                    name="preferredDoctor"
                    value={doctor.name}
                    className="sr-only peer"
                    checked={formData.preferredDoctor === doctor.name}
                    onChange={handleInputChange}
                  />
                  <div className="border-2 rounded-lg p-4 cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-gray-300">
                    <div className="flex items-start">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <p className="text-xs text-gray-500">{doctor.experience}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Medical Reports */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Medical Reports
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Upload medical reports (PDF, JPG, PNG)</p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="btn btn-secondary cursor-pointer">
                Choose Files
              </label>
            </div>

            {uploadedReports.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Uploaded Reports</h3>
                <div className="space-y-2">
                  {uploadedReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{report.name}</p>
                          <p className="text-sm text-gray-500">{report.size} - {report.uploadDate}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeReport(report.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Appointment Scheduling */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" />
              Schedule Appointment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select name="appointmentTime" required className="input" value={formData.appointmentTime} onChange={handleInputChange}>
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary px-8 py-3 text-lg font-medium"
            >
              Submit Appointment Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientAppointment;
