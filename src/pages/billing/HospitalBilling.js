import React, { useState } from 'react';
import { Search, Plus, Filter, Download, DollarSign, Calendar, User, FileText, CheckCircle, XCircle, Clock, Stethoscope, Building } from 'lucide-react';

const HospitalBilling = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBill, setSelectedBill] = useState(null);

  // Sample hospital billing data
  const hospitalBills = [
    {
      id: 'HSP001',
      patientName: 'John Smith',
      patientId: 'P001',
      date: '2024-01-15',
      services: [
        { name: 'Consultation Fee', quantity: 1, price: 150, total: 150 },
        { name: 'Blood Test', quantity: 1, price: 80, total: 80 },
        { name: 'X-Ray', quantity: 1, price: 200, total: 200 }
      ],
      doctor: 'Dr. Emily Chen',
      department: 'General Medicine',
      subtotal: 430,
      tax: 43,
      total: 473,
      status: 'paid',
      paymentMethod: 'Insurance',
      insuranceProvider: 'HealthPlus Insurance'
    },
    {
      id: 'HSP002',
      patientName: 'Emily Davis',
      patientId: 'P002',
      date: '2024-01-15',
      services: [
        { name: 'Emergency Room', quantity: 1, price: 500, total: 500 },
        { name: 'CT Scan', quantity: 1, price: 350, total: 350 },
        { name: 'IV Therapy', quantity: 1, price: 120, total: 120 }
      ],
      doctor: 'Dr. Robert Wilson',
      department: 'Emergency',
      subtotal: 970,
      tax: 97,
      total: 1067,
      status: 'pending',
      paymentMethod: 'Pending',
      insuranceProvider: 'BlueCross'
    },
    {
      id: 'HSP003',
      patientName: 'Robert Wilson',
      patientId: 'P003',
      date: '2024-01-14',
      services: [
        { name: 'Surgery - Appendectomy', quantity: 1, price: 2500, total: 2500 },
        { name: 'Anesthesia', quantity: 1, price: 800, total: 800 },
        { name: 'Hospital Stay (2 days)', quantity: 2, price: 300, total: 600 }
      ],
      doctor: 'Dr. Maria Garcia',
      department: 'Surgery',
      subtotal: 3900,
      tax: 390,
      total: 4290,
      status: 'paid',
      paymentMethod: 'Card',
      insuranceProvider: 'MediCare'
    },
    {
      id: 'HSP004',
      patientName: 'Sarah Johnson',
      patientId: 'P004',
      date: '2024-01-14',
      services: [
        { name: 'Maternity Care', quantity: 1, price: 1200, total: 1200 },
        { name: 'Delivery Room', quantity: 1, price: 800, total: 800 },
        { name: 'Newborn Care', quantity: 1, price: 300, total: 300 }
      ],
      doctor: 'Dr. Emily Chen',
      department: 'Obstetrics',
      subtotal: 2300,
      tax: 230,
      total: 2530,
      status: 'paid',
      paymentMethod: 'Insurance',
      insuranceProvider: 'HealthPlus Insurance'
    }
  ];

  const filteredBills = hospitalBills.filter(bill => {
    const matchesSearch = bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bill.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Billing</h1>
          <p className="text-gray-600">Manage hospital services and treatment billing</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Hospital Bill
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹7,293.00</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Bills</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bills</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Insurance Claims</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by patient name, bill ID, or doctor..."
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="btn btn-secondary flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="btn btn-secondary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Bill ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Services</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Insurance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{bill.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{bill.patientName}</p>
                      <p className="text-sm text-gray-500">{bill.patientId}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {bill.date}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      {bill.services.slice(0, 2).map((service, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-gray-900">{service.name}</span>
                          {service.quantity > 1 && <span className="text-gray-500 ml-1">x{service.quantity}</span>}
                        </div>
                      ))}
                      {bill.services.length > 2 && (
                        <div className="text-sm text-gray-500">+{bill.services.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-gray-600">
                      <Stethoscope className="h-4 w-4 mr-1" />
                      <span className="text-sm">{bill.doctor}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{bill.department}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">₹{bill.total.toFixed(2)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                      {getStatusIcon(bill.status)}
                      <span className="ml-1">{bill.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <span className="text-sm text-gray-600">{bill.insuranceProvider}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedBill(bill)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Detail Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Hospital Bill Details</h2>
              <button
                onClick={() => setSelectedBill(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bill ID</p>
                  <p className="font-medium text-gray-900">{selectedBill.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">{selectedBill.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Patient Name</p>
                  <p className="font-medium text-gray-900">{selectedBill.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Patient ID</p>
                  <p className="font-medium text-gray-900">{selectedBill.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-medium text-gray-900">{selectedBill.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">{selectedBill.department}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Services</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Service</th>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Quantity</th>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Price</th>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.services.map((service, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-2 px-4 text-sm text-gray-900">{service.name}</td>
                          <td className="py-2 px-4 text-sm text-gray-600">{service.quantity}</td>
                          <td className="py-2 px-4 text-sm text-gray-600">₹{service.price}</td>
                          <td className="py-2 px-4 text-sm font-medium text-gray-900">₹{service.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">₹{selectedBill.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium text-gray-900">₹{selectedBill.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance Provider</span>
                    <span className="font-medium text-gray-900">{selectedBill.insuranceProvider}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{selectedBill.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="btn btn-primary flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Bill
                </button>
                <button className="btn btn-secondary">
                  Print Bill
                </button>
                <button className="btn btn-secondary">
                  Process Insurance
                </button>
                <button 
                  onClick={() => setSelectedBill(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalBilling;
