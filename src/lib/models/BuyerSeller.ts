import mongoose from 'mongoose';

export interface IBuyerSellerListing {
  _id?: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const BuyerSellerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  userName: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: false
  },
  userWhatsApp: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true,
    enum: ['buyer', 'seller']
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Dairy', 'Other']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'quintal', 'ton', 'pieces', 'liters', 'bags']
  },
  pricePerUnit: {
    type: Number,
    required: false,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: false,
    trim: true
  },
  contactPhone: {
    type: String,
    required: false,
    trim: true
  },
  contactWhatsApp: {
    type: String,
    required: false,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
BuyerSellerSchema.index({ type: 1, category: 1, isActive: 1 });
BuyerSellerSchema.index({ userId: 1, isActive: 1 });
BuyerSellerSchema.index({ location: 1, type: 1, isActive: 1 });

export default mongoose.models.BuyerSeller || mongoose.model('BuyerSeller', BuyerSellerSchema);