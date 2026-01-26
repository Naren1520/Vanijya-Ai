import { ObjectId } from 'mongodb';

export interface UserProfile {
  _id?: ObjectId;
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  googleId: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  phone: string;
  address: string;
  googleId: string;
  avatar?: string;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}