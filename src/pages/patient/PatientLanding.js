import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, User, ArrowRight, Shield, Clock, Heart, Calendar } from 'lucide-react';

const PatientLanding = () => {
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
              <span className="ml-2 text-xl font-bold text-gray-900">Akruti Hospital</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/login" className="btn btn-secondary flex items-center">
                <User className="h-4 w-4 mr-2" />
                Staff Login
              </Link>
              <Link to="/patient-appointment" className="btn btn-primary flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Akruti Hospital
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted healthcare partner providing comprehensive medical services with compassion and excellence.
          </p>
          
          {/* Main Action Buttons */}
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                to="/login" 
                className="btn btn-secondary text-lg px-8 py-4 flex items-center justify-center transform transition-all hover:scale-105"
              >
                <User className="h-6 w-6 mr-3" />
                Staff/Admin Login
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
              <Link 
                to="/patient-appointment" 
                className="btn btn-primary text-lg px-8 py-4 flex items-center justify-center transform transition-all hover:scale-105"
              >
                <Calendar className="h-6 w-6 mr-3" />
                Book Appointment
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Care</h3>
            <p className="text-gray-600">
              Expert medical professionals dedicated to your health and well-being
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Service</h3>
            <p className="text-gray-600">
              Round-the-clock medical assistance and emergency care services
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Technology</h3>
            <p className="text-gray-600">
              State-of-the-art medical equipment and modern treatment facilities
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">General Medicine</h4>
            </div>
            <div className="text-center p-4">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Cardiology</h4>
            </div>
            <div className="text-center p-4">
              <User className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Pediatrics</h4>
            </div>
            <div className="text-center p-4">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Emergency Care</h4>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Medical Assistance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Login to access our comprehensive hospital management system
          </p>
          
          <div className="flex justify-center mb-8">
            <Link 
              to="/patient-appointment" 
              className="btn btn-primary text-lg px-8 py-4 flex items-center"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Book Your Appointment
              <ArrowRight className="h-6 w-6 ml-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Patients</h3>
              <p className="text-gray-600">Book appointments, upload medical reports, track your health records</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Staff/Admin</h3>
              <p className="text-gray-600">Access hospital management system, manage patients, billing, and services</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Services</h3>
              <p className="text-gray-600">Emergency appointments, lab tests, pharmacy services available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold">Akruti Hospital</span>
            </div>
            <p className="text-gray-400">
              © 2024 Akruti Hospital Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLanding;
