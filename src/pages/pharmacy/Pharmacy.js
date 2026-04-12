import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import {
  Pill,
  Plus,
  Search,
  AlertTriangle,
  Package,
  Edit,
  Trash2,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign
} from 'lucide-react';

const Pharmacy = () => {
  const { medicines, setMedicines } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    unit: 'tablets',
    price: '',
    manufacturer: '',
    expiryDate: '',
    description: '',
    batchNumber: '',
    reorderLevel: 50
  });

  const categories = [
    'Pain Relief', 'Antibiotics', 'Vitamins', 'Cardiac', 'Diabetes',
    'Respiratory', 'Digestive', 'Allergy', 'Skin Care', 'Eye Care'
  ];

  const units = ['tablets', 'capsules', 'bottles', 'injections', 'creams', 'syrups'];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || medicine.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const lowStockMedicines = medicines.filter(med => med.stock <= med.reorderLevel || med.stock < 100);
  const expiringSoonMedicines = medicines.filter(med => {
    const expiryDate = new Date(med.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMedicine) {
      setMedicines(medicines.map(med =>
        med.id === editingMedicine.id
          ? { ...formData, stock: parseInt(formData.stock), price: parseFloat(formData.price), reorderLevel: parseInt(formData.reorderLevel) }
          : med
      ));
      setEditingMedicine(null);
    } else {
      const newMedicine = {
        id: Date.now(),
        ...formData,
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price),
        reorderLevel: parseInt(formData.reorderLevel)
      };
      setMedicines([...medicines, newMedicine]);
    }
    
    setFormData({
      name: '',
      category: '',
      stock: '',
      unit: 'tablets',
      price: '',
      manufacturer: '',
      expiryDate: '',
      description: '',
      batchNumber: '',
      reorderLevel: 50
    });
    setShowAddForm(false);
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category,
      stock: medicine.stock.toString(),
      unit: medicine.unit,
      price: medicine.price.toString(),
      manufacturer: medicine.manufacturer,
      expiryDate: medicine.expiryDate,
      description: medicine.description || '',
      batchNumber: medicine.batchNumber || '',
      reorderLevel: medicine.reorderLevel || 50
    });
    setShowAddForm(true);
  };

  const handleDelete = (medicineId) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(med => med.id !== medicineId));
    }
  };

  const updateStock = (medicineId, newStock) => {
    setMedicines(medicines.map(med =>
      med.id === medicineId
        ? { ...med, stock: newStock }
        : med
    ));
  };

  const getStockStatus = (stock, reorderLevel) => {
    if (stock === 0) return { color: 'red', text: 'Out of Stock' };
    if (stock <= reorderLevel) return { color: 'yellow', text: 'Low Stock' };
    if (stock < reorderLevel * 2) return { color: 'orange', text: 'Medium Stock' };
    return { color: 'green', text: 'In Stock' };
  };

  const getExpiryStatus = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    
    if (expiry < now) return { color: 'red', text: 'Expired' };
    if (expiry <= threeMonthsFromNow) return { color: 'yellow', text: 'Expiring Soon' };
    return { color: 'green', text: 'Valid' };
  };

  const totalValue = medicines.reduce((sum, med) => sum + (med.stock * med.price), 0);
  const totalItems = medicines.reduce((sum, med) => sum + med.stock, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Management</h1>
          <p className="text-gray-600">Manage medicine inventory and stock alerts</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary px-4 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Medicine
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockMedicines.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {(lowStockMedicines.length > 0 || expiringSoonMedicines.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lowStockMedicines.length > 0 && (
            <div className="card p-6 border-l-4 border-yellow-500">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
              </div>
              <div className="space-y-2">
                {lowStockMedicines.slice(0, 5).map((medicine) => (
                  <div key={medicine.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{medicine.name}</p>
                      <p className="text-sm text-gray-500">{medicine.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        {medicine.stock} {medicine.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {expiringSoonMedicines.length > 0 && (
            <div className="card p-6 border-l-4 border-red-500">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Expiring Soon</h3>
              </div>
              <div className="space-y-2">
                {expiringSoonMedicines.slice(0, 5).map((medicine) => (
                  <div key={medicine.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{medicine.name}</p>
                      <p className="text-sm text-gray-500">{medicine.manufacturer}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {medicine.expiryDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Medicine Form */}
      {showAddForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingMedicine(null);
                setFormData({
                  name: '',
                  category: '',
                  stock: '',
                  unit: 'tablets',
                  price: '',
                  manufacturer: '',
                  expiryDate: '',
                  description: '',
                  batchNumber: '',
                  reorderLevel: 50
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
                  Medicine Name *
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  className="input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  className="input"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  className="input"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  required
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Unit *
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
                  Manufacturer *
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  className="input"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Number
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reorder Level
                </label>
                <input
                  type="number"
                  className="input"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="input"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter medicine description..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingMedicine(null);
                }}
                className="btn btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2">
                {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
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
              placeholder="Search medicines by name or manufacturer..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button className="btn btn-secondary px-4 py-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manufacturer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => {
                const stockStatus = getStockStatus(medicine.stock, medicine.reorderLevel);
                const expiryStatus = getExpiryStatus(medicine.expiryDate);
                
                return (
                  <tr key={medicine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Pill className="h-5 w-5 mr-3 text-primary-500" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                          <div className="text-sm text-gray-500">Batch: {medicine.batchNumber || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {medicine.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-${stockStatus.color}-100 text-${stockStatus.color}-800 mr-2`}>
                          {stockStatus.text}
                        </span>
                        <span className="text-sm text-gray-900">
                          {medicine.stock} {medicine.unit}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${medicine.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">Total: ${(medicine.stock * medicine.price).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.manufacturer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-${expiryStatus.color}-100 text-${expiryStatus.color}-800`}>
                        {expiryStatus.text}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">{medicine.expiryDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(medicine)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(medicine.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                          placeholder="Add"
                          min="0"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value && value > 0) {
                              updateStock(medicine.id, medicine.stock + value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
