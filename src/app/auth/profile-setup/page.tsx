'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { User, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function ProfileSetupPage() {
  const { saveUserProfile, hasCompletedProfile, isLoading } = useAuth();
  const { data: session } = useSession();
  const { t } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (hasCompletedProfile) {
      router.push('/dashboard');
      return;
    }

    // Pre-fill name from Google account
    if (session.user?.name) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
      }));
    }
  }, [session, hasCompletedProfile, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-()]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await saveUserProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      });

      // Success - redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-saffron-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-saffron-50 via-white to-earth-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="glass rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-white/80 to-saffron-50/80 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/Assets/logo.png"
                  alt="Vanijya AI Logo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl font-display font-bold text-earth-800 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-earth-600 text-sm">
              Help us personalize your Vanijya AI experience
            </p>
          </div>

          {/* Google Account Info */}
          {session?.user && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Connected with Google
                  </p>
                  <p className="text-xs text-green-600">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-colors`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-colors`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.address ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-colors resize-none`}
                placeholder="Enter your complete address"
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full gradient-saffron text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Saving Profile...</span>
                </div>
              ) : (
                'Complete Setup'
              )}
            </motion.button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-earth-500 mt-6 text-center">
            Your information is securely stored and used only to provide 
            personalized AI assistance for your mandi transactions.
          </p>
        </div>
      </motion.div>
    </div>
  );
}