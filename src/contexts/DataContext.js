import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      email: 'john.smith@email.com',
      phone: '+1 234-567-8900',
      bloodGroup: 'O+',
      medicalHistory: 'Hypertension, Diabetes Type 2',
      lastVisit: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      email: 'sarah.j@email.com',
      phone: '+1 234-567-8901',
      bloodGroup: 'A+',
      medicalHistory: 'Asthma',
      lastVisit: '2024-01-18',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 58,
      gender: 'Male',
      email: 'michael.b@email.com',
      phone: '+1 234-567-8902',
      bloodGroup: 'B+',
      medicalHistory: 'Heart Disease, Arthritis',
      lastVisit: '2024-01-12',
      status: 'Active'
    }
  ]);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Emily Chen',
      specialization: 'Cardiology',
      experience: 12,
      email: 'emily.chen@medicore.com',
      phone: '+1 234-567-8903',
      available: true,
      schedule: ['Mon-Fri: 9AM-5PM'],
      patients: 45
    },
    {
      id: 2,
      name: 'Dr. Robert Wilson',
      specialization: 'General Medicine',
      experience: 8,
      email: 'robert.wilson@medicore.com',
      phone: '+1 234-567-8904',
      available: true,
      schedule: ['Mon-Sat: 8AM-6PM'],
      patients: 62
    },
    {
      id: 3,
      name: 'Dr. Maria Garcia',
      specialization: 'Pediatrics',
      experience: 15,
      email: 'maria.garcia@medicore.com',
      phone: '+1 234-567-8905',
      available: false,
      schedule: ['Tue-Thu: 10AM-4PM'],
      patients: 38
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientId: 1,
      doctorId: 1,
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'Consultation',
      notes: 'Regular checkup'
    },
    {
      id: 2,
      patientId: 2,
      doctorId: 2,
      date: '2024-01-21',
      time: '2:00 PM',
      status: 'pending',
      type: 'Follow-up',
      notes: 'Review test results'
    }
  ]);

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Pain Relief',
      stock: 150,
      unit: 'tablets',
      price: 5.99,
      manufacturer: 'MedCorp',
      expiryDate: '2025-12-31'
    },
    {
      id: 2,
      name: 'Amoxicillin',
      category: 'Antibiotics',
      stock: 75,
      unit: 'capsules',
      price: 12.50,
      manufacturer: 'PharmaPlus',
      expiryDate: '2024-08-15'
    }
  ]);

  const [beds, setBeds] = useState([
    {
      id: 1,
      ward: 'ICU',
      bedNumber: 'ICU-001',
      type: 'ICU Bed',
      status: 'occupied',
      patientId: 1,
      price: 500
    },
    {
      id: 2,
      ward: 'General',
      bedNumber: 'GEN-001',
      type: 'General Ward',
      status: 'available',
      patientId: null,
      price: 150
    },
    {
      id: 3,
      ward: 'Private',
      bedNumber: 'PVT-001',
      type: 'Private Room',
      status: 'available',
      patientId: null,
      price: 300
    }
  ]);

  const value = {
    patients,
    setPatients,
    doctors,
    setDoctors,
    appointments,
    setAppointments,
    medicines,
    setMedicines,
    beds,
    setBeds
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
