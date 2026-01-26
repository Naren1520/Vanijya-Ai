'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, MapPin, Phone, Mail, Search, Plus, Edit, Trash2, X, Save, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface BuyerSellerListing {
  _id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  userWhatsApp?: string;
  type: 'buyer' | 'seller';
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit?: number;
  location: string;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ListingForm {
  type: 'buyer' | 'seller';
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit?: number;
  location: string;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  userName: string;
  userPhone?: string;
  userWhatsApp?: string;
}

export default function BuyerSellerPage() {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [listings, setListings] = useState<BuyerSellerListing[]>([]);
  const [myListings, setMyListings] = useState<BuyerSellerListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMyListings, setShowMyListings] = useState(false);
  const [editingListing, setEditingListing] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'buyer' | 'seller'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState<ListingForm>({
    type: 'seller',
    productName: '',
    category: 'Vegetables',
    quantity: 1,
    unit: 'kg',
    pricePerUnit: undefined,
    location: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    contactWhatsApp: '',
    userName: user?.name || '',
    userPhone: '',
    userWhatsApp: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Dairy', 'Other'];
  const units = ['kg', 'quintal', 'ton', 'pieces', 'liters', 'bags'];

  useEffect(() => {
    fetchListings();
    if (isAuthenticated) {
      fetchMyListings();
    }
  }, [isAuthenticated, filter, selectedCategory]);

  useEffect(() => {
    if (user?.name) {
      setFormData(prev => ({ ...prev, userName: user.name }));
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('type', filter);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      
      const response = await fetch(`/api/buyer-seller?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        setError('Failed to fetch listings');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyListings = async () => {
    try {
      const response = await fetch('/api/buyer-seller/my-listings');
      
      if (response.ok) {
        const data = await response.json();
        setMyListings(data);
      }
    } catch (error) {
      console.error('Error fetching my listings:', error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingListing ? `/api/buyer-seller/${editingListing}` : '/api/buyer-seller';
      const method = editingListing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingListing ? 'Listing updated successfully!' : 'Listing created successfully!');
        setShowAddForm(false);
        setEditingListing(null);
        resetForm();
        fetchListings();
        fetchMyListings();
      } else {
        setError(data.error || 'Failed to save listing');
      }
    } catch (error) {
      console.error('Error saving listing:', error);
      setError('Failed to save listing');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const response = await fetch(`/api/buyer-seller/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Listing deleted successfully!');
        fetchListings();
        fetchMyListings();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      setError('Failed to delete listing');
    }
  };

  const handleEdit = (listing: BuyerSellerListing) => {
    setFormData({
      type: listing.type,
      productName: listing.productName,
      category: listing.category,
      quantity: listing.quantity,
      unit: listing.unit,
      pricePerUnit: listing.pricePerUnit,
      location: listing.location,
      description: listing.description,
      contactEmail: listing.contactEmail || '',
      contactPhone: listing.contactPhone || '',
      contactWhatsApp: listing.contactWhatsApp || '',
      userName: listing.userName,
      userPhone: listing.userPhone || '',
      userWhatsApp: listing.userWhatsApp || ''
    });
    setEditingListing(listing._id);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      type: 'seller',
      productName: '',
      category: 'Vegetables',
      quantity: 1,
      unit: 'kg',
      pricePerUnit: undefined,
      location: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      contactWhatsApp: '',
      userName: user?.name || '',
      userPhone: '',
      userWhatsApp: ''
    });
    setEditingListing(null);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Users className="w-16 h-16 text-earth-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-earth-800 mb-4">
            {t('features.buyerSeller.title')}
          </h1>
          <p className="text-earth-600 mb-8">
            {t('features.buyerSeller.signInMessage')}
          </p>
          <a
            href="/auth/signin"
            className="gradient-saffron text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-block"
          >
            {t('features.buyerSeller.signInButton')}
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            {t('features.buyerSeller.title')}
          </h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            {t('features.buyerSeller.subtitle')}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <button
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
            className="gradient-saffron text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t('features.buyerSeller.addListing')}</span>
          </button>
          <button
            onClick={() => setShowMyListings(!showMyListings)}
            className="glass text-earth-700 px-6 py-3 rounded-lg font-medium hover:bg-white/40 transition-all duration-300 flex items-center space-x-2"
          >
            <Package className="w-5 h-5" />
            <span>{t('features.buyerSeller.myListings')} ({myListings.length})</span>
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

        {/* My Listings Section */}
        {showMyListings && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-earth-800 mb-4">My Listings</h2>
            {myListings.length === 0 ? (
              <p className="text-earth-600 text-center py-8">
                You haven't created any listings yet. Click "Add Listing" to get started.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myListings.map((listing) => (
                  <div key={listing._id} className="bg-white/40 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-earth-800">{listing.productName}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          listing.type === 'buyer' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handleEdit(listing)}
                          className="p-1 hover:bg-white/20 rounded"
                        >
                          <Edit className="w-4 h-4 text-earth-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(listing._id)}
                          className="p-1 hover:bg-white/20 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-earth-600 mb-2">{listing.quantity} {listing.unit}</p>
                    <p className="text-sm text-earth-600">{listing.location}</p>
                    <p className="text-xs text-earth-500 mt-2">
                      Created: {new Date(listing.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-500" />
              <input
                type="text"
                placeholder="Search products, locations, or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'buyer' | 'seller')}
              className="glass px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
            >
              <option value="all">All Types</option>
              <option value="buyer">Buyers</option>
              <option value="seller">Sellers</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="glass px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
                setSelectedCategory('all');
              }}
              className="gradient-saffron text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Clear Filters
            </button>
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
              className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-earth-800">
                  {editingListing ? 'Edit Listing' : 'Add New Listing'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingListing(null);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    I want to *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="seller"
                        checked={formData.type === 'seller'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'buyer' | 'seller' })}
                        className="mr-2"
                      />
                      <span>Sell products</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="buyer"
                        checked={formData.type === 'buyer'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'buyer' | 'seller' })}
                        className="mr-2"
                      />
                      <span>Buy products</span>
                    </label>
                  </div>
                </div>

                {/* User Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Your Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.userPhone || ''}
                      onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Your WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.userWhatsApp || ''}
                      onChange={(e) => setFormData({ ...formData, userWhatsApp: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="WhatsApp number"
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="e.g., Fresh Tomatoes"
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
                </div>

                {/* Quantity and Price */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
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

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Price per {formData.unit} (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.pricePerUnit || ''}
                      onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="Describe your product, quality, availability, etc."
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Contact Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail || ''}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="Different from account email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone || ''}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="Different from your phone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Contact WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.contactWhatsApp || ''}
                      onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                      placeholder="Different from your WhatsApp"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingListing(null);
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
                    <span>{editingListing ? 'Update' : 'Create'} Listing</span>
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
            <p className="text-earth-600">Loading listings...</p>
          </div>
        ) : (
          <>
            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing, index) => (
                  <motion.div
                    key={listing._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="glass rounded-2xl p-6 card-hover"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                          listing.type === 'buyer' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {listing.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-earth-800">{listing.userName}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              listing.type === 'buyer' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {listing.type === 'buyer' ? 'Looking to Buy' : 'Selling'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="mb-4">
                      <h4 className="font-bold text-lg text-earth-800 mb-2">{listing.productName}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-earth-600">{listing.category}</span>
                        <span className="font-semibold text-earth-800">
                          {listing.quantity} {listing.unit}
                        </span>
                      </div>
                      {listing.pricePerUnit && (
                        <div className="text-lg font-bold text-green-600">
                          ₹{listing.pricePerUnit}/{listing.unit}
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-earth-500" />
                      <span className="text-sm text-earth-600">{listing.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-earth-600 mb-4 line-clamp-3">{listing.description}</p>

                    {/* Contact Actions */}
                    <div className="space-y-2">
                      {/* Phone - prioritize contact phone over user phone */}
                      {(listing.contactPhone || listing.userPhone) && (
                        <a 
                          href={`tel:${listing.contactPhone || listing.userPhone}`}
                          className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{listing.contactPhone || listing.userPhone}</span>
                        </a>
                      )}
                      
                      {/* WhatsApp - prioritize contact WhatsApp over user WhatsApp */}
                      {(listing.contactWhatsApp || listing.userWhatsApp) && (
                        <a 
                          href={`https://wa.me/${(listing.contactWhatsApp || listing.userWhatsApp)?.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${encodeURIComponent(listing.productName)} from Vanijya AI`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{listing.contactWhatsApp || listing.userWhatsApp}</span>
                        </a>
                      )}
                      
                      {/* Email - prioritize contact email over user email */}
                      <a 
                        href={`mailto:${listing.contactEmail || listing.userEmail}`}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{listing.contactEmail || listing.userEmail}</span>
                      </a>
                    </div>

                    {/* Posted Date */}
                    <div className="mt-3 text-xs text-earth-500 text-center">
                      Posted: {new Date(listing.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* No Results */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Users className="w-16 h-16 text-earth-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-earth-600 mb-2">No listings found</h3>
                <p className="text-earth-500 mb-6">
                  {searchTerm || filter !== 'all' || selectedCategory !== 'all'
                    ? 'Try adjusting your filters or search terms'
                    : 'Be the first to add a listing!'
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
                  <span>Add First Listing</span>
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}