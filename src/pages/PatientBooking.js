import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Stethoscope, Mail, Phone, Calendar, Clock } from 'lucide-react';

const PatientBooking = () => {
  const { appointments, setAppointments, doctors, patients, setPatients } = useData();
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    department: 'General Medicine',
    requestedDate: '',
    requestedTime: '',
    reason: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const departments = [
    'General Medicine',
    'Cardiology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'ENT'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const departmentDoctors = doctors.filter((doctor) =>
      doctor.specialization === formData.department
    );

    const availableDoctors = departmentDoctors.length > 0 ? departmentDoctors : doctors;

    const doctorQueueCounts = availableDoctors.map((doctor) => ({
      doctor,
      count: appointments.filter((appointment) => appointment.doctorId === doctor.id).length
    }));

    const assignedDoctor = doctorQueueCounts.sort((a, b) => a.count - b.count)[0]?.doctor || availableDoctors[0];

    const queueNumber = appointments.filter((appointment) => appointment.doctorId === assignedDoctor.id).length + 1;
    const token = `${assignedDoctor.token}-P${String(queueNumber).padStart(3, '0')}`;

    const newPatient = {
      id: Date.now(),
      name: formData.patientName,
      age: null,
      gender: 'Unknown',
      email: formData.patientEmail,
      phone: formData.patientPhone,
      bloodGroup: 'Unknown',
      medicalHistory: formData.reason,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Pending',
      token,
      assignedDoctorId: assignedDoctor.id
    };

    const newAppointment = {
      id: Date.now() + 1,
      token,
      patientId: newPatient.id,
      doctorId: assignedDoctor.id,
      department: formData.department,
      date: formData.requestedDate,
      time: formData.requestedTime,
      status: 'pending',
      type: 'Patient Request',
      notes: formData.reason
    };

    setPatients([newPatient, ...patients]);
    setAppointments([newAppointment, ...appointments]);
    setSuccessMessage(`Appointment booked with ${assignedDoctor.name}. Your token is ${token}.`);
    setFormData({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      department: 'General Medicine',
      requestedDate: '',
      requestedTime: '',
      reason: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-primary-600 px-8 py-12 text-white">
              <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-500 mb-6">
                <Stethoscope className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Book Your Visit</h1>
              <p className="text-base text-primary-100 leading-relaxed">
                Need a consultation at Akruti Hospital? Fill out the patient appointment request form and our staff will assign your case to a doctor using a secure token.
              </p>
              <div className="mt-8 space-y-3 text-sm text-primary-100">
                <p>
                  After submission, a unique appointment token will be generated. Our staff can use that token to assign the request to a doctor so your case appears on the doctor dashboard.
                </p>
                <p>
                  Already part of the hospital team?{' '}
                  <Link to="/login" className="font-semibold underline text-white">
                    Login here.
                  </Link>
                </p>
                <div className="mt-6">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-sm hover:bg-slate-100 transition"
                  >
                    Staff / Doctor / Admin Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Patient Appointment Request</h2>
                  <p className="text-sm text-gray-500">Complete the form to request an appointment at Akruti Hospital.</p>
                </div>
                <div className="hidden sm:flex items-center px-3 py-2 bg-gray-100 rounded-xl">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">info@akruti.com</span>
                </div>
              </div>

              {successMessage && (
                <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-900">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                      className="input w-full"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        name="patientEmail"
                        type="email"
                        value={formData.patientEmail}
                        onChange={handleChange}
                        required
                        className="input w-full pl-10"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        name="patientPhone"
                        type="tel"
                        value={formData.patientPhone}
                        onChange={handleChange}
                        required
                        className="input w-full pl-10"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="input w-full"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input
                      name="requestedDate"
                      type="date"
                      value={formData.requestedDate}
                      onChange={handleChange}
                      required
                      className="input w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <select
                      name="requestedTime"
                      value={formData.requestedTime}
                      onChange={handleChange}
                      required
                      className="input w-full"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input w-full"
                    placeholder="Describe your symptoms or reason for appointment"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full py-3 text-base">
                  Submit Appointment Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBooking;
