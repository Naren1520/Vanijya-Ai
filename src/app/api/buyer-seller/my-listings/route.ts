import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import BuyerSeller from '@/lib/models/BuyerSeller';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Get all listings for the authenticated user
    const userListings = await BuyerSeller.find({
      userId: session.user.email
    }).sort({ createdAt: -1 });

    return NextResponse.json(userListings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user listings' },
      { status: 500 }
    );
  }
}