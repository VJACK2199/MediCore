import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/patients/PatientManagement';
import PatientLanding from './pages/patient/PatientLanding';
import PatientAppointment from './pages/patient/PatientAppointment';
import PatientProfile from './pages/patients/PatientProfile';
import DoctorManagement from './pages/doctors/DoctorManagement';
import Appointments from './pages/appointments/Appointments';
import Billing from './pages/billing/Billing';
import PharmacyBilling from './pages/billing/PharmacyBilling';
import HospitalBilling from './pages/billing/HospitalBilling';
import Pharmacy from './pages/pharmacy/Pharmacy';
import Laboratory from './pages/laboratory/Laboratory';
import BedManagement from './pages/beds/BedManagement';
import Settings from './pages/Settings';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/patient-portal" element={<PatientLanding />} />
              <Route path="/patient-appointment" element={<PatientAppointment />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patients" element={<PatientManagement />} />
                        <Route path="/patients/:id" element={<PatientProfile />} />
                        <Route path="/doctors" element={<DoctorManagement />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/hospital-billing" element={<HospitalBilling />} />
                        <Route path="/pharmacy-billing" element={<PharmacyBilling />} />
                        <Route path="/pharmacy" element={<Pharmacy />} />
                        <Route path="/laboratory" element={<Laboratory />} />
                        <Route path="/beds" element={<BedManagement />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
