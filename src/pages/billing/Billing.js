import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import {
  DollarSign,
  Plus,
  Search,
  Download,
  CreditCard,
  FileText,
  Calendar,
  Users,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Receipt
} from 'lucide-react';

const Billing = () => {
  const { patients, appointments } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentId: '',
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    paymentMethod: 'cash',
    insuranceDetails: '',
    notes: ''
  });

  // Sample invoices data
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      patientId: 1,
      patientName: 'John Smith',
      date: '2024-01-15',
      items: [
        { description: 'Consultation Fee', quantity: 1, price: 150 },
        { description: 'Blood Test', quantity: 1, price: 75 },
        { description: 'Medicine', quantity: 2, price: 25 }
      ],
      subtotal: 275,
      tax: 27.5,
      total: 302.5,
      status: 'paid',
      paymentMethod: 'credit_card',
      insuranceDetails: 'Insurance covers 80%',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Sarah Johnson',
      date: '2024-01-18',
      items: [
        { description: 'General Checkup', quantity: 1, price: 120 },
        { description: 'X-Ray', quantity: 1, price: 200 }
      ],
      subtotal: 320,
      tax: 32,
      total: 352,
      status: 'pending',
      paymentMethod: 'cash',
      insuranceDetails: 'No insurance',
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: 3,
      patientId: 3,
      patientName: 'Michael Brown',
      date: '2024-01-12',
      items: [
        { description: 'Emergency Visit', quantity: 1, price: 300 },
        { description: 'ECG', quantity: 1, price: 150 }
      ],
      subtotal: 450,
      tax: 45,
      total: 495,
      status: 'overdue',
      paymentMethod: 'insurance',
      insuranceDetails: 'Pending approval',
      invoiceNumber: 'INV-2024-003'
    }
  ]);

  const [newInvoiceItem, setNewInvoiceItem] = useState({
    description: '',
    quantity: 1,
    price: 0
  });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const serviceItems = [
    'Consultation Fee', 'General Checkup', 'Emergency Visit', 'Follow-up',
    'Blood Test', 'X-Ray', 'ECG', 'MRI', 'CT Scan', 'Ultrasound',
    'Vaccination', 'Medicine', 'Surgery', 'Therapy Session'
  ];

  const paymentMethods = ['cash', 'credit_card', 'debit_card', 'insurance', 'online'];

  const addInvoiceItem = () => {
    if (newInvoiceItem.description && newInvoiceItem.price > 0) {
      const updatedItems = [...formData.items, { ...newInvoiceItem }];
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax;
      
      setFormData({
        ...formData,
        items: updatedItems,
        subtotal,
        tax,
        total
      });
      
      setNewInvoiceItem({ description: '', quantity: 1, price: 0 });
    }
  };

  const removeInvoiceItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    setFormData({
      ...formData,
      items: updatedItems,
      subtotal,
      tax,
      total
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const patient = patients.find(p => p.id === parseInt(formData.patientId));
    const newInvoice = {
      id: Date.now(),
      patientId: parseInt(formData.patientId),
      patientName: patient?.name || 'Unknown Patient',
      date: new Date().toISOString().split('T')[0],
      ...formData,
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`
    };
    
    setInvoices([...invoices, newInvoice]);
    
    setFormData({
      patientId: '',
      appointmentId: '',
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      paymentMethod: 'cash',
      insuranceDetails: '',
      notes: ''
    });
    setShowInvoiceForm(false);
  };

  const updatePaymentStatus = (invoiceId, newStatus) => {
    setInvoices(invoices.map(invoice =>
      invoice.id === invoiceId
        ? { ...invoice, status: newStatus }
        : invoice
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'partial':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'overdue':
        return <XCircle className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const downloadInvoice = (invoice) => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading invoice:', invoice);
    alert(`Invoice ${invoice.invoiceNumber} would be downloaded as PDF`);
  };

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600">Manage invoices and payment tracking</p>
        </div>
        <button
          onClick={() => setShowInvoiceForm(true)}
          className="btn btn-primary px-4 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900">${pendingAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Form */}
      {showInvoiceForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generate New Invoice</h3>
            <button
              onClick={() => {
                setShowInvoiceForm(false);
                setFormData({
                  patientId: '',
                  appointmentId: '',
                  items: [],
                  subtotal: 0,
                  tax: 0,
                  total: 0,
                  paymentMethod: 'cash',
                  insuranceDetails: '',
                  notes: ''
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
                  Patient *
                </label>
                <select
                  className="input"
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  className="input"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                >
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>
                      {method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invoice Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Items
              </label>
              
              {/* Add Item Form */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Description"
                    className="input"
                    value={newInvoiceItem.description}
                    onChange={(e) => setNewInvoiceItem({ ...newInvoiceItem, description: e.target.value })}
                    list="services"
                  />
                  <datalist id="services">
                    {serviceItems.map(service => (
                      <option key={service} value={service} />
                    ))}
                  </datalist>
                  
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="input"
                    value={newInvoiceItem.quantity}
                    onChange={(e) => setNewInvoiceItem({ ...newInvoiceItem, quantity: parseInt(e.target.value) || 1 })}
                    min="1"
                  />
                  
                  <input
                    type="number"
                    placeholder="Price"
                    className="input"
                    value={newInvoiceItem.price}
                    onChange={(e) => setNewInvoiceItem({ ...newInvoiceItem, price: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                  />
                  
                  <button
                    type="button"
                    onClick={addInvoiceItem}
                    className="btn btn-secondary"
                  >
                    Add Item
                  </button>
                </div>
              </div>

              {/* Items List */}
              {formData.items.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium">{item.description}</span>
                        <span className="text-gray-500 ml-2">× {item.quantity}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                        <button
                          type="button"
                          onClick={() => removeInvoiceItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${formData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${formData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${formData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Details
              </label>
              <textarea
                className="input"
                rows={2}
                value={formData.insuranceDetails}
                onChange={(e) => setFormData({ ...formData, insuranceDetails: e.target.value })}
                placeholder="Enter insurance information..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowInvoiceForm(false)}
                className="btn btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2">
                Generate Invoice
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
              placeholder="Search invoices by patient name or invoice number..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="partial">Partial</option>
          </select>
          <button className="btn btn-secondary px-4 py-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
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
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Receipt className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium text-gray-900">{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {invoice.patientName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {invoice.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">${invoice.total.toFixed(2)}</div>
                      <div className="text-gray-500">{invoice.items.length} items</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                      {invoice.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => downloadInvoice(invoice)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => updatePaymentStatus(invoice.id, 'paid')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
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

export default Billing;
