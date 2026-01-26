import mongoose from 'mongoose';

export interface IInventoryItem {
  _id?: string;
  userId: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  maxCapacity: number;
  avgPrice: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InventorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Other']
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'quintal', 'ton', 'pieces', 'liters']
  },
  minThreshold: {
    type: Number,
    required: true,
    min: 0
  },
  maxCapacity: {
    type: Number,
    required: true,
    min: 1
  },
  avgPrice: {
    type: Number,
    required: true,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for user-specific queries
InventorySchema.index({ userId: 1, category: 1 });
InventorySchema.index({ userId: 1, name: 1 });

export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);