import { getCollection } from '@/lib/mongodb';
import { UserProfile, CreateUserData, UpdateUserData } from '@/lib/models/User';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'users';

export class UserService {
  private static async getUsersCollection() {
    return await getCollection(COLLECTION_NAME);
  }

  // Create a new user
  static async createUser(userData: CreateUserData): Promise<UserProfile> {
    const collection = await this.getUsersCollection();
    
    if (!collection) {
      throw new Error('Failed to get users collection');
    }
    
    const now = new Date();
    const user: Omit<UserProfile, '_id'> = {
      id: new ObjectId().toString(),
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(user);
    
    return {
      _id: result.insertedId,
      ...user,
    };
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<UserProfile | null> {
    const collection = await this.getUsersCollection();
    if (!collection) return null;
    
    const user = await collection.findOne({ email });
    return user as UserProfile | null;
  }

  // Get user by Google ID
  static async getUserByGoogleId(googleId: string): Promise<UserProfile | null> {
    const collection = await this.getUsersCollection();
    if (!collection) return null;
    
    const user = await collection.findOne({ googleId });
    return user as UserProfile | null;
  }

  // Get user by ID
  static async getUserById(id: string): Promise<UserProfile | null> {
    const collection = await this.getUsersCollection();
    if (!collection) return null;
    
    const user = await collection.findOne({ id });
    return user as UserProfile | null;
  }

  // Update user
  static async updateUser(id: string, updateData: UpdateUserData): Promise<UserProfile | null> {
    const collection = await this.getUsersCollection();
    if (!collection) return null;
    
    const result = await collection.findOneAndUpdate(
      { id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    );

    return result as UserProfile | null;
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    const collection = await this.getUsersCollection();
    if (!collection) return false;
    
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  // Get all users (admin function)
  static async getAllUsers(): Promise<UserProfile[]> {
    const collection = await this.getUsersCollection();
    if (!collection) return [];
    
    const users = await collection.find({}).toArray();
    return users as UserProfile[];
  }

  // Check if user exists by email
  static async userExists(email: string): Promise<boolean> {
    const collection = await this.getUsersCollection();
    if (!collection) return false;
    
    const count = await collection.countDocuments({ email });
    return count > 0;
  }

  // Update user profile (name, phone, address)
  static async updateUserProfile(
    email: string, 
    profileData: { name: string; phone: string; address: string }
  ): Promise<UserProfile | null> {
    const collection = await this.getUsersCollection();
    if (!collection) return null;
    
    const result = await collection.findOneAndUpdate(
      { email },
      { 
        $set: { 
          ...profileData, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    );

    return result as UserProfile | null;
  }
}