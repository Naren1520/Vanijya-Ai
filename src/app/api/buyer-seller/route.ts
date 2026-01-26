import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import BuyerSeller, { IBuyerSellerListing } from '@/lib/models/BuyerSeller';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'buyer' or 'seller'
    const category = searchParams.get('category');
    const location = searchParams.get('location');

    let query: any = { isActive: true };
    
    if (type && (type === 'buyer' || type === 'seller')) {
      query.type = type;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const listings = await BuyerSeller.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching buyer-seller listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

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
      userWhatsApp
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

    if (pricePerUnit !== undefined && pricePerUnit < 0) {
      return NextResponse.json(
        { error: 'Price per unit cannot be negative' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const listing = new BuyerSeller({
      userId: session.user.email, // Using email as userId for consistency
      userEmail: session.user.email,
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
      isActive: true
    });

    const savedListing = await listing.save();

    return NextResponse.json(savedListing, { status: 201 });
  } catch (error) {
    console.error('Error creating buyer-seller listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}