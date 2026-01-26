'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, AlertTriangle, Plus, Edit, Trash2, Brain, X, Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface InventoryItem {
  _id: string;
  userId: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  maxCapacity: number;
  avgPrice: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

interface NewItemForm {
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  maxCapacity: number;
  avgPrice: number;
}

export default function InventoryPage() {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewItemForm>({
    name: '',
    category: 'Vegetables',
    currentStock: 0,
    unit: 'kg',
    minThreshold: 0,
    maxCapacity: 100,
    avgPrice: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Other'];
  const units = ['kg', 'quintal', 'ton', 'pieces', 'liters'];
  useEffect(() => {
    if (isAuthenticated) {
      fetchInventory();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, selectedCategory]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? '/api/inventory' 
        : `/api/inventory?category=${selectedCategory}`;
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      } else {
        setError('Failed to fetch inventory');
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setError('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingItem ? `/api/inventory/${editingItem}` : '/api/inventory';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingItem ? 'Item updated successfully!' : 'Item added successfully!');
        setShowAddForm(false);
        setEditingItem(null);
        resetForm();
        fetchInventory();
      } else {
        setError(data.error || 'Failed to save item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      setError('Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Item deleted successfully!');
        fetchInventory();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setFormData({
      name: item.name,
      category: item.category,
      currentStock: item.currentStock,
      unit: item.unit,
      minThreshold: item.minThreshold,
      maxCapacity: item.maxCapacity,
      avgPrice: item.avgPrice
    });
    setEditingItem(item._id);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Vegetables',
      currentStock: 0,
      unit: 'kg',
      minThreshold: 0,
      maxCapacity: 100,
      avgPrice: 0
    });
    setEditingItem(null);
  };

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxCapacity) * 100;
    if (item.currentStock <= item.minThreshold) return { status: 'critical', color: 'red' };
    if (percentage < 30) return { status: 'low', color: 'yellow' };
    if (percentage > 80) return { status: 'high', color: 'blue' };
    return { status: 'optimal', color: 'green' };
  };

  const generateAIInsight = (item: InventoryItem) => {
    const stockStatus = getStockStatus(item);
    
    if (stockStatus.status === 'critical') {
      return `Critical: ${item.name} stock is below minimum threshold. Immediate restocking required.`;
    } else if (stockStatus.status === 'low') {
      return `Low stock alert: ${item.name} is running low. Consider restocking soon.`;
    } else if (stockStatus.status === 'high') {
      return `High stock: ${item.name} inventory is well-stocked. Monitor for optimal turnover.`;
    } else {
      return `Optimal: ${item.name} stock levels are balanced. Continue monitoring demand patterns.`;
    }
  };

  const generateRestockSuggestion = (item: InventoryItem) => {
    const needed = item.maxCapacity - item.currentStock;
    const daysToRestock = item.currentStock <= item.minThreshold ? 1 : 7;
    
    return `Suggest restocking ${needed} ${item.unit} within ${daysToRestock} days to maintain optimal levels.`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Package className="w-16 h-16 text-earth-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-earth-800 mb-4">
            Smart Inventory Management
          </h1>
          <p className="text-earth-600 mb-8">
            Sign in to access AI-powered inventory management with real-time insights
          </p>
          <a
            href="/auth/signin"
            className="gradient-saffron text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-block"
          >
            Sign In to Continue
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
              Smart Inventory Management
            </h1>
            <p className="text-xl text-earth-600">
              AI-powered insights for optimal stock management
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
            className="gradient-saffron text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </motion.div>

        {/* Error/Success Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
          >
            {success}
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Total Items</p>
                <p className="text-2xl font-bold text-earth-800">{inventory.length}</p>
              </div>
              <Package className="w-8 h-8 text-saffron-500" />
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {inventory.filter(item => item.currentStock <= item.minThreshold).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{inventory.reduce((sum, item) => sum + (item.currentStock * item.avgPrice), 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Categories</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(inventory.map(item => item.category)).size}
                </p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'gradient-saffron text-white'
                  : 'glass text-earth-700 hover:bg-white/40'
              }`}
            >
              All Categories ({inventory.length})
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'gradient-saffron text-white'
                    : 'glass text-earth-700 hover:bg-white/40'
                }`}
              >
                {category} ({inventory.filter(item => item.category === category).length})
              </button>
            ))}
          </div>
        </motion.div>
        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-earth-800">
                  {editingItem ? 'Edit Item' : 'Add New Item'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="e.g., Tomatoes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Current Stock *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.currentStock}
                      onChange={(e) => setFormData({ ...formData, currentStock: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Unit *
                    </label>
                    <select
                      required
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Min Threshold *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.minThreshold}
                      onChange={(e) => setFormData({ ...formData, minThreshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Max Capacity *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={formData.maxCapacity}
                      onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Average Price (₹ per {formData.unit}) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.avgPrice}
                    onChange={(e) => setFormData({ ...formData, avgPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 gradient-saffron text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? 'Update' : 'Add'} Item</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-earth-600">Loading inventory...</p>
          </div>
        ) : (
          <>
            {/* Inventory Grid */}
            {inventory.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {inventory.map((item, index) => {
                  const stockStatus = getStockStatus(item);
                  const stockPercentage = (item.currentStock / item.maxCapacity) * 100;
                  
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="glass rounded-2xl p-6 card-hover"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-earth-800 text-lg">{item.name}</h3>
                          <p className="text-sm text-earth-600">{item.category}</p>
                        </div>
                        <div className="flex space-x-1">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-1 hover:bg-white/20 rounded"
                          >
                            <Edit className="w-4 h-4 text-earth-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="p-1 hover:bg-white/20 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* Stock Level */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-earth-600">Current Stock</span>
                          <span className={`text-sm font-medium text-${stockStatus.color}-600`}>
                            {stockStatus.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="w-full bg-earth-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full bg-${stockStatus.color}-500`}
                            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-earth-600">
                          <span>{item.currentStock} {item.unit}</span>
                          <span>Max: {item.maxCapacity} {item.unit}</span>
                        </div>
                      </div>

                      {/* Price & Value */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-earth-600">Avg Price</p>
                          <p className="font-semibold text-earth-800">₹{item.avgPrice}/{item.unit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-earth-600">Total Value</p>
                          <p className="font-semibold text-green-600">
                            ₹{(item.currentStock * item.avgPrice).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start space-x-2">
                          <Brain className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-purple-700 mb-1">AI Insight</p>
                            <p className="text-xs text-purple-600">{generateAIInsight(item)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Restock Suggestion */}
                      <div className="bg-saffron-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-saffron-700 mb-1">Restock Suggestion</p>
                        <p className="text-xs text-saffron-600">{generateRestockSuggestion(item)}</p>
                      </div>

                      {/* Last Updated */}
                      <div className="mt-3 text-xs text-earth-500 text-center">
                        Updated: {new Date(item.lastUpdated).toLocaleString()}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* No Items */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Package className="w-16 h-16 text-earth-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-earth-600 mb-2">
                  {selectedCategory === 'all' ? 'No inventory items found' : `No ${selectedCategory.toLowerCase()} items found`}
                </h3>
                <p className="text-earth-500 mb-6">
                  {selectedCategory === 'all' 
                    ? 'Add your first inventory item to get started with AI-powered management' 
                    : `Add items in the ${selectedCategory.toLowerCase()} category or select a different category`
                  }
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddForm(true);
                  }}
                  className="gradient-saffron text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add First Item</span>
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}