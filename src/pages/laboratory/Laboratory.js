import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import {
  FlaskConical,
  Plus,
  Search,
  FileText,
  Download,
  Upload,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Filter,
  TestTube
} from 'lucide-react';

const Laboratory = () => {
  const { patients, doctors } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showTestForm, setShowTestForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('tests');
  
  // Sample lab tests data
  const [labTests, setLabTests] = useState([
    {
      id: 1,
      patientId: 1,
      patientName: 'John Smith',
      doctorId: 1,
      doctorName: 'Dr. Emily Chen',
      testType: 'Complete Blood Count',
      requestedDate: '2024-01-15',
      sampleDate: '2024-01-15',
      resultDate: '2024-01-16',
      status: 'completed',
      urgency: 'routine',
      notes: 'Routine checkup',
      results: {
        hemoglobin: '14.5 g/dL',
        wbc: '7.2 × 10^9/L',
        rbc: '4.8 × 10^12/L',
        platelets: '250 × 10^9/L',
        interpretation: 'All values within normal range'
      },
      reportUrl: '#'
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Sarah Johnson',
      doctorId: 2,
      doctorName: 'Dr. Robert Wilson',
      testType: 'HbA1c',
      requestedDate: '2024-01-18',
      sampleDate: '2024-01-18',
      resultDate: '2024-01-19',
      status: 'completed',
      urgency: 'routine',
      notes: 'Diabetes monitoring',
      results: {
        hba1c: '6.8%',
        interpretation: 'Slightly elevated, monitor diet'
      },
      reportUrl: '#'
    },
    {
      id: 3,
      patientId: 3,
      patientName: 'Michael Brown',
      doctorId: 1,
      doctorName: 'Dr. Emily Chen',
      testType: 'Lipid Profile',
      requestedDate: '2024-01-20',
      sampleDate: '2024-01-20',
      resultDate: '',
      status: 'pending',
      urgency: 'urgent',
      notes: 'Pre-operative assessment',
      results: {},
      reportUrl: '#'
    }
  ]);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    testType: '',
    urgency: 'routine',
    requestedDate: new Date().toISOString().split('T')[0],
    sampleDate: '',
    notes: ''
  });

  const testTypes = [
    'Complete Blood Count', 'HbA1c', 'Lipid Profile', 'Liver Function Test',
    'Kidney Function Test', 'Thyroid Function Test', 'Urinalysis',
    'X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'ECG', 'EEG',
    'COVID-19 Test', 'Blood Culture', 'Vitamin D Test', 'Iron Studies'
  ];

  const urgencyLevels = ['routine', 'urgent', 'emergency'];

  const filteredTests = labTests.filter(test => {
    const matchesSearch = 
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || test.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const patient = patients.find(p => p.id === parseInt(formData.patientId));
    const doctor = doctors.find(d => d.id === parseInt(formData.doctorId));
    
    if (editingTest) {
      setLabTests(labTests.map(test =>
        test.id === editingTest.id
          ? { 
              ...formData, 
              patientId: parseInt(formData.patientId),
              doctorId: parseInt(formData.doctorId),
              patientName: patient?.name || 'Unknown Patient',
              doctorName: doctor?.name || 'Unknown Doctor',
              id: editingTest.id
            }
          : test
      ));
      setEditingTest(null);
    } else {
      const newTest = {
        id: Date.now(),
        ...formData,
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        patientName: patient?.name || 'Unknown Patient',
        doctorName: doctor?.name || 'Unknown Doctor',
        sampleDate: formData.sampleDate || formData.requestedDate,
        resultDate: '',
        status: 'pending',
        results: {},
        reportUrl: '#'
      };
      setLabTests([...labTests, newTest]);
    }
    
    setFormData({
      patientId: '',
      doctorId: '',
      testType: '',
      urgency: 'routine',
      requestedDate: new Date().toISOString().split('T')[0],
      sampleDate: '',
      notes: ''
    });
    setShowTestForm(false);
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      patientId: test.patientId.toString(),
      doctorId: test.doctorId.toString(),
      testType: test.testType,
      urgency: test.urgency,
      requestedDate: test.requestedDate,
      sampleDate: test.sampleDate,
      notes: test.notes
    });
    setShowTestForm(true);
  };

  const updateStatus = (testId, newStatus) => {
    setLabTests(labTests.map(test =>
      test.id === testId
        ? { 
            ...test, 
            status: newStatus,
            resultDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : test.resultDate
          }
        : test
    ));
  };

  const uploadResults = (testId) => {
    // In a real app, this would open a file upload dialog
    const newResults = {
      hemoglobin: prompt('Enter Hemoglobin value:') || 'N/A',
      wbc: prompt('Enter WBC value:') || 'N/A',
      interpretation: prompt('Enter interpretation:') || 'Results pending'
    };
    
    setLabTests(labTests.map(test =>
      test.id === testId
        ? { ...test, results: newResults, status: 'completed', resultDate: new Date().toISOString().split('T')[0] }
        : test
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <TestTube className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'urgent':
        return 'bg-orange-100 text-orange-800';
      case 'routine':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingTests = labTests.filter(test => test.status === 'pending').length;
  const completedTests = labTests.filter(test => test.status === 'completed').length;
  const urgentTests = labTests.filter(test => test.urgency === 'urgent' || test.urgency === 'emergency').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laboratory Management</h1>
          <p className="text-gray-600">Manage lab tests and results</p>
        </div>
        <button
          onClick={() => setShowTestForm(true)}
          className="btn btn-primary px-4 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Request Test
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{labTests.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingTests}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedTests}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent Tests</p>
              <p className="text-2xl font-bold text-gray-900">{urgentTests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['tests', 'results'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Test Request Form */}
      {showTestForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingTest ? 'Edit Test Request' : 'Request New Test'}
            </h3>
            <button
              onClick={() => {
                setShowTestForm(false);
                setEditingTest(null);
                setFormData({
                  patientId: '',
                  doctorId: '',
                  testType: '',
                  urgency: 'routine',
                  requestedDate: new Date().toISOString().split('T')[0],
                  sampleDate: '',
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
                  Doctor *
                </label>
                <select
                  className="input"
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Type *
                </label>
                <select
                  className="input"
                  value={formData.testType}
                  onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
                  required
                >
                  <option value="">Select Test Type</option>
                  {testTypes.map(test => (
                    <option key={test} value={test}>{test}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency *
                </label>
                <select
                  className="input"
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  required
                >
                  {urgencyLevels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Date *
                </label>
                <input
                  type="date"
                  required
                  className="input"
                  value={formData.requestedDate}
                  onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sample Date
                </label>
                <input
                  type="date"
                  className="input"
                  value={formData.sampleDate}
                  onChange={(e) => setFormData({ ...formData, sampleDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="input"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter any additional notes..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowTestForm(false);
                  setEditingTest(null);
                }}
                className="btn btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2">
                {editingTest ? 'Update Request' : 'Request Test'}
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
              placeholder="Search tests by patient, doctor, or test type..."
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
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="btn btn-secondary px-4 py-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Tests Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient & Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urgency
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
              {filteredTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {test.patientName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        Dr. {test.doctorName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TestTube className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm text-gray-900">{test.testType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-900">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {test.requestedDate}
                      </div>
                      {test.sampleDate && (
                        <div className="text-gray-500">Sample: {test.sampleDate}</div>
                      )}
                      {test.resultDate && (
                        <div className="text-green-600">Result: {test.resultDate}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(test.urgency)}`}>
                      {test.urgency.charAt(0).toUpperCase() + test.urgency.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                      {getStatusIcon(test.status)}
                      <span className="ml-1">{test.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(test)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      {test.status === 'pending' && (
                        <button
                          onClick={() => uploadResults(test.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      )}
                      {test.status === 'completed' && (
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => updateStatus(test.id, 'completed')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
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

export default Laboratory;
