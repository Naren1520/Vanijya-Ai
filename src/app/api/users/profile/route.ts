import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';
import { CreateUserData } from '@/lib/models/User';

// GET - Fetch user profile by email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const user = await UserService.getUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, phone, address, googleId, avatar } = body;

    // Validate required fields
    if (!email || !name || !phone || !address || !googleId) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, phone, address, googleId' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await UserService.getUserByEmail(email);
    
    if (existingUser) {
      // Update existing user
      const updatedUser = await UserService.updateUserProfile(email, {
        name,
        phone,
        address,
      });
      
      if (!updatedUser) {
        return NextResponse.json(
          { error: 'Failed to update user profile' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(updatedUser);
    } else {
      // Create new user
      const userData: CreateUserData = {
        email,
        name,
        phone,
        address,
        googleId,
        avatar,
      };
      
      const newUser = await UserService.createUser(userData);
      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, phone, address } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const updatedUser = await UserService.updateUserProfile(email, {
      name,
      phone,
      address,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}