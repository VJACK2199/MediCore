import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import {
  Bed,
  Plus,
  Search,
  Users,
  Edit,
  Trash2,
  Filter,
  Building,
  User,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle
} from 'lucide-react';

const BedManagement = () => {
  const { patients, beds, setBeds } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBed, setEditingBed] = useState(null);
  const [filterWard, setFilterWard] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    ward: '',
    bedNumber: '',
    type: 'General',
    status: 'available',
    price: '',
    floor: '',
    roomNumber: '',
    features: '',
    lastMaintenance: ''
  });

  const wards = ['ICU', 'General', 'Private', 'Maternity', 'Pediatric', 'Emergency', 'Surgery Recovery'];
  const bedTypes = ['ICU Bed', 'General Ward', 'Private Room', 'Semi-Private', 'Deluxe Suite', 'Maternity Bed', 'Pediatric Bed'];

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = 
      bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWard = filterWard === 'all' || bed.ward === filterWard;
    const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;
    
    return matchesSearch && matchesWard && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingBed) {
      setBeds(beds.map(bed =>
        bed.id === editingBed.id
          ? { ...formData, price: parseFloat(formData.price), id: editingBed.id }
          : bed
      ));
      setEditingBed(null);
    } else {
      const newBed = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        patientId: null
      };
      setBeds([...beds, newBed]);
    }
    
    setFormData({
      ward: '',
      bedNumber: '',
      type: 'General',
      status: 'available',
      price: '',
      floor: '',
      roomNumber: '',
      features: '',
      lastMaintenance: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (bed) => {
    setEditingBed(bed);
    setFormData({
      ward: bed.ward,
      bedNumber: bed.bedNumber,
      type: bed.type,
      status: bed.status,
      price: bed.price.toString(),
      floor: bed.floor || '',
      roomNumber: bed.roomNumber || '',
      features: bed.features || '',
      lastMaintenance: bed.lastMaintenance || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (bedId) => {
    if (window.confirm('Are you sure you want to delete this bed?')) {
      setBeds(beds.filter(bed => bed.id !== bedId));
    }
  };

  const toggleBedStatus = (bedId) => {
    setBeds(beds.map(bed =>
      bed.id === bedId
        ? { 
            ...bed, 
            status: bed.status === 'available' ? 'occupied' : 'available',
            patientId: bed.status === 'available' ? null : bed.patientId
          }
        : bed
    ));
  };

  const assignPatient = (bedId, patientId) => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    setBeds(beds.map(bed =>
      bed.id === bedId
        ? { 
            ...bed, 
            status: 'occupied',
            patientId: parseInt(patientId),
            patientName: patient?.name || 'Unknown Patient'
          }
        : bed
    ));
  };

  const dischargePatient = (bedId) => {
    setBeds(beds.map(bed =>
      bed.id === bedId
        ? { 
            ...bed, 
            status: 'available',
            patientId: null,
            patientName: null
          }
        : bed
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4" />;
      case 'occupied':
        return <XCircle className="h-4 w-4" />;
      case 'maintenance':
        return <Building className="h-4 w-4" />;
      case 'reserved':
        return <Users className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  const availableBeds = beds.filter(bed => bed.status === 'available').length;
  const occupiedBeds = beds.filter(bed => bed.status === 'occupied').length;
  const maintenanceBeds = beds.filter(bed => bed.status === 'maintenance').length;
  const totalRevenue = occupiedBeds * 150; // Average daily rate

  const wardStats = wards.map(ward => {
    const wardBeds = beds.filter(bed => bed.ward === ward);
    return {
      name: ward,
      total: wardBeds.length,
      available: wardBeds.filter(bed => bed.status === 'available').length,
      occupied: wardBeds.filter(bed => bed.status === 'occupied').length
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bed & Ward Management</h1>
          <p className="text-gray-600">Manage hospital beds and room allocation</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary px-4 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Bed
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bed className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Beds</p>
              <p className="text-2xl font-bold text-gray-900">{beds.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">{availableBeds}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-gray-900">{occupiedBeds}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">{maintenanceBeds}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ward Overview */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ward Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wardStats.map((ward) => (
            <div key={ward.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{ward.name}</h4>
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Beds:</span>
                  <span className="font-medium">{ward.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium text-green-600">{ward.available}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Occupied:</span>
                  <span className="font-medium text-red-600">{ward.occupied}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(ward.available / ward.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Bed Form */}
      {showAddForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingBed ? 'Edit Bed' : 'Add New Bed'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingBed(null);
                setFormData({
                  ward: '',
                  bedNumber: '',
                  type: 'General',
                  status: 'available',
                  price: '',
                  floor: '',
                  roomNumber: '',
                  features: '',
                  lastMaintenance: ''
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
                  Ward *
                </label>
                <select
                  className="input"
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  required
                >
                  <option value="">Select Ward</option>
                  {wards.map(ward => (
                    <option key={ward} value={ward}>{ward}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bed Number *
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.bedNumber}
                  onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
                  placeholder="e.g., ICU-001, GEN-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bed Type *
                </label>
                <select
                  className="input"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  {bedTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  className="input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Price ($) *
                </label>
                <input
                  type="number"
                  required
                  className="input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Floor
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  placeholder="e.g., 1st Floor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Number
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="e.g., Room 101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Maintenance
                </label>
                <input
                  type="date"
                  className="input"
                  value={formData.lastMaintenance}
                  onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features
              </label>
              <textarea
                className="input"
                rows={3}
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Enter bed features (e.g., Oxygen supply, Monitor, TV, etc.)"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingBed(null);
                }}
                className="btn btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2">
                {editingBed ? 'Update Bed' : 'Add Bed'}
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
              placeholder="Search beds by number, ward, or type..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input"
            value={filterWard}
            onChange={(e) => setFilterWard(e.target.value)}
          >
            <option value="all">All Wards</option>
            {wards.map(ward => (
              <option key={ward} value={ward}>{ward}</option>
            ))}
          </select>
          <select
            className="input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
            <option value="reserved">Reserved</option>
          </select>
          <button className="btn btn-secondary px-4 py-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeds.map((bed) => {
          const patient = patients.find(p => p.id === bed.patientId);
          
          return (
            <div key={bed.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    bed.status === 'available' ? 'bg-green-100' : 
                    bed.status === 'occupied' ? 'bg-red-100' : 
                    bed.status === 'maintenance' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Bed className={`h-6 w-6 ${
                      bed.status === 'available' ? 'text-green-600' : 
                      bed.status === 'occupied' ? 'text-red-600' : 
                      bed.status === 'maintenance' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{bed.bedNumber}</h3>
                    <p className="text-sm text-gray-500">{bed.type}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bed.status)}`}>
                  {getStatusIcon(bed.status)}
                  <span className="ml-1">{bed.status}</span>
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  {bed.ward}
                </div>
                {bed.floor && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {bed.floor} {bed.roomNumber && `- ${bed.roomNumber}`}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  ${bed.price}/day
                </div>
                {bed.patientId && patient && (
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {patient.name}
                  </div>
                )}
              </div>

              {bed.features && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Features:</p>
                  <p className="text-sm text-gray-700">{bed.features}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(bed)}
                  className="flex-1 btn btn-secondary py-2 text-sm"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                {bed.status === 'available' && (
                  <button className="flex-1 btn btn-primary py-2 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    Assign
                  </button>
                )}
                {bed.status === 'occupied' && (
                  <button
                    onClick={() => dischargePatient(bed.id)}
                    className="flex-1 btn btn-success py-2 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Discharge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BedManagement;
