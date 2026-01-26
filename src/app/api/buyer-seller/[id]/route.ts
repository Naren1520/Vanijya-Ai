import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import BuyerSeller from '@/lib/models/BuyerSeller';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const {
      type,
      productName,
      category,
      quantity,
      unit,
      pricePerUnit,
      location,
      description,
      contactEmail,
      contactPhone,
      contactWhatsApp,
      userName,
      userPhone,
      userWhatsApp,
      isActive
    } = body;

    // Validation
    if (!type || !productName || !category || !quantity || !unit || !location || !description || !userName) {
      return NextResponse.json(
        { error: 'Required fields: type, productName, category, quantity, unit, location, description, userName' },
        { status: 400 }
      );
    }

    if (!['buyer', 'seller'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "buyer" or "seller"' },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than 0' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if listing exists and belongs to user
    const existingListing = await BuyerSeller.findOne({
      _id: id,
      userId: session.user.email
    });

    if (!existingListing) {
      return NextResponse.json(
        { error: 'Listing not found or you do not have permission to edit it' },
        { status: 404 }
      );
    }

    const updatedListing = await BuyerSeller.findByIdAndUpdate(
      id,
      {
        userName: userName.trim(),
        userPhone: userPhone?.trim(),
        userWhatsApp: userWhatsApp?.trim(),
        type,
        productName: productName.trim(),
        category,
        quantity: Number(quantity),
        unit,
        pricePerUnit: pricePerUnit ? Number(pricePerUnit) : undefined,
        location: location.trim(),
        description: description.trim(),
        contactEmail: contactEmail?.trim(),
        contactPhone: contactPhone?.trim(),
        contactWhatsApp: contactWhatsApp?.trim(),
        isActive: isActive !== undefined ? isActive : true
      },
      { new: true }
    );

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error('Error updating buyer-seller listing:', error);
    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await connectToDatabase();

    // Check if listing exists and belongs to user
    const existingListing = await BuyerSeller.findOne({
      _id: id,
      userId: session.user.email
    });

    if (!existingListing) {
      return NextResponse.json(
        { error: 'Listing not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }

    await BuyerSeller.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting buyer-seller listing:', error);
    return NextResponse.json(
      { error: 'Failed to delete listing' },
      { status: 500 }
    );
  }
}

// Get user's own listings
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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