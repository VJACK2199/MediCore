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
      status: 'Pending'
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
      status: 'Consulting'
    },
    {
      id: 4,
      name: 'Baburao Ganpatrao Apte',
      age: 54,
      gender: 'Male',
      email: 'star_garage@gmail.com',
      phone: '+91 172-2549807',
      bloodGroup: 'B+',
      medicalHistory: 'Hearing loss, sinus infection',
      lastVisit: '2026-05-26',
      status: 'Emergency'
    },
    {
      id: 5,
      name: 'Aisha Khan',
      age: 29,
      gender: 'Female',
      email: 'aisha.khan@akruti.com',
      phone: '+91 98112 33445',
      bloodGroup: 'A-',
      medicalHistory: 'Skin allergy, dermatitis',
      lastVisit: '2026-05-20',
      status: 'Pending'
    },
    {
      id: 6,
      name: 'Rohan Mehta',
      age: 38,
      gender: 'Male',
      email: 'rohan.mehta@akruti.com',
      phone: '+91 98765 12345',
      bloodGroup: 'O-',
      medicalHistory: 'Back pain, joint stiffness',
      lastVisit: '2026-05-22',
      status: 'Consulting'
    },
    {
      id: 7,
      name: 'Priya Nair',
      age: 27,
      gender: 'Female',
      email: 'priya.nair@akruti.com',
      phone: '+91 94444 66221',
      bloodGroup: 'AB+',
      medicalHistory: 'Migraine, dizziness',
      lastVisit: '2026-05-21',
      status: 'In Process'
    },
    {
      id: 8,
      name: 'Nisha Sharma',
      age: 48,
      gender: 'Female',
      email: 'nisha.sharma@akruti.com',
      phone: '+91 99876 55443',
      bloodGroup: 'O+',
      medicalHistory: 'High blood pressure, chest pain',
      lastVisit: '2026-05-24',
      status: 'Closed'
    }
  ]);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      token: 'DOC-EC-001',
      name: 'Dr. Emily Chen',
      specialization: 'Cardiology',
      experience: 12,
      email: 'emily.chen@akruti.com',
      phone: '+1 234-567-8903',
      available: true,
      schedule: ['Mon-Fri: 9AM-5PM'],
      patients: 45
    },
    {
      id: 2,
      token: 'DOC-RW-002',
      name: 'Dr. Robert Wilson',
      specialization: 'General Medicine',
      experience: 8,
      email: 'robert.wilson@akruti.com',
      phone: '+1 234-567-8904',
      available: true,
      schedule: ['Mon-Sat: 8AM-6PM'],
      patients: 62
    },
    {
      id: 3,
      token: 'DOC-MG-003',
      name: 'Dr. Maria Garcia',
      specialization: 'Pediatrics',
      experience: 15,
      email: 'maria.garcia@akruti.com',
      phone: '+1 234-567-8905',
      available: false,
      schedule: ['Tue-Thu: 10AM-4PM'],
      patients: 38
    }
  ,
    {
      id: 4,
      token: 'DOC-AP-004',
      name: 'Dr. Arjun Patel',
      specialization: 'Cardiology',
      experience: 10,
      email: 'arjun.patel@akruti.com',
      phone: '+91 98765 43210',
      available: true,
      schedule: ['Mon-Wed: 10AM-4PM', 'Fri: 2PM-6PM'],
      patients: 54
    },
    {
      id: 5,
      token: 'DOC-PS-005',
      name: 'Dr. Priya Sharma',
      specialization: 'Dermatology',
      experience: 7,
      email: 'priya.sharma@akruti.com',
      phone: '+91 91234 56789',
      available: false,
      schedule: ['Tue-Thu: 11AM-3PM'],
      patients: 27
    },
    {
      id: 6,
      token: 'DOC-RK-006',
      name: 'Dr. Ravi Kumar',
      specialization: 'Orthopedics',
      experience: 14,
      email: 'ravi.kumar@akruti.com',
      phone: '+91 99887 66554',
      available: true,
      schedule: ['Mon-Fri: 9AM-2PM'],
      patients: 88
    },
    {
      id: 7,
      token: 'DOC-SR-007',
      name: 'Dr. Sangeeta Rao',
      specialization: 'Gynecology',
      experience: 11,
      email: 'sangeeta.rao@akruti.com',
      phone: '+91 90123 45678',
      available: false,
      schedule: ['Wed-Fri: 1PM-5PM'],
      patients: 33
    },
    {
      id: 8,
      token: 'DOC-AV-008',
      name: 'Dr. Amit Verma',
      specialization: 'ENT',
      experience: 9,
      email: 'amit.verma@akruti.com',
      phone: '+91 90909 09090',
      available: true,
      schedule: ['Tue-Sat: 10AM-4PM'],
      patients: 41
    },
    {
      id: 9,
      token: 'DOC-NS-009',
      name: 'Dr. Neha Singh',
      specialization: 'Neurology',
      experience: 13,
      email: 'neha.singh@akruti.com',
      phone: '+91 94444 33322',
      available: true,
      schedule: ['Mon, Thu: 9AM-1PM', 'Fri: 3PM-6PM'],
      patients: 58
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      token: 'AKR-1001',
      patientId: 1,
      doctorId: 1,
      department: 'Cardiology',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'Consultation',
      notes: 'Regular checkup'
    },
    {
      id: 2,
      token: 'AKR-1002',
      patientId: 2,
      doctorId: 2,
      department: 'General Medicine',
      date: '2024-01-21',
      time: '2:00 PM',
      status: 'pending',
      type: 'Follow-up',
      notes: 'Review test results'
    },
    {
      id: 3,
      token: 'AKR-1003',
      patientId: 3,
      doctorId: 3,
      department: 'Pediatrics',
      date: '2026-05-25',
      time: '9:30 AM',
      status: 'confirmed',
      type: 'Consultation',
      notes: 'Pediatric checkup and general examination'
    },
    {
      id: 4,
      token: 'AKR-2001',
      patientId: 4,
      doctorId: 8,
      department: 'ENT',
      date: '2026-05-26',
      time: '11:00 AM',
      status: 'confirmed',
      type: 'Follow-up',
      notes: 'Sinus infection review and hearing evaluation'
    },
    {
      id: 5,
      token: 'AKR-2002',
      patientId: 5,
      doctorId: 5,
      department: 'Dermatology',
      date: '2026-05-20',
      time: '10:30 AM',
      status: 'confirmed',
      type: 'Consultation',
      notes: 'Skin allergy treatment and medication review'
    },
    {
      id: 7,
      token: 'AKR-2003',
      patientId: 6,
      doctorId: 6,
      department: 'Orthopedics',
      date: '2026-05-22',
      time: '12:00 PM',
      status: 'pending',
      type: 'Consultation',
      notes: 'Back pain evaluation and joint stiffness management'
    },
    {
      id: 8,
      token: 'AKR-2004',
      patientId: 7,
      doctorId: 9,
      department: 'Neurology',
      date: '2026-05-21',
      time: '3:30 PM',
      status: 'confirmed',
      type: 'Consultation',
      notes: 'Migraine and dizziness assessment'
    },
    {
      id: 9,
      token: 'AKR-2005',
      patientId: 8,
      doctorId: 4,
      department: 'Cardiology',
      date: '2026-05-24',
      time: '2:30 PM',
      status: 'confirmed',
      type: 'Consultation',
      notes: 'Hypertension and chest pain evaluation'
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
