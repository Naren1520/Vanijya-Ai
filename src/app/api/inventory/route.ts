import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import Inventory, { IInventoryItem } from '@/lib/models/Inventory';

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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query: any = { userId: session.user.email };
    if (category && category !== 'all') {
      query.category = category;
    }

    const inventory = await Inventory.find(query).sort({ updatedAt: -1 });

    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
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
      name,
      category,
      currentStock,
      unit,
      minThreshold,
      maxCapacity,
      avgPrice
    } = body;

    // Validation
    if (!name || !category || currentStock === undefined || !unit || 
        minThreshold === undefined || maxCapacity === undefined || avgPrice === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (currentStock < 0 || minThreshold < 0 || maxCapacity <= 0 || avgPrice < 0) {
      return NextResponse.json(
        { error: 'Invalid values: stock, threshold, and price must be non-negative, capacity must be positive' },
        { status: 400 }
      );
    }

    if (maxCapacity < minThreshold) {
      return NextResponse.json(
        { error: 'Maximum capacity must be greater than minimum threshold' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if item already exists for this user
    const existingItem = await Inventory.findOne({
      userId: session.user.email,
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'An item with this name already exists in your inventory' },
        { status: 409 }
      );
    }

    const inventoryItem = new Inventory({
      userId: session.user.email,
      name: name.trim(),
      category,
      currentStock: Number(currentStock),
      unit,
      minThreshold: Number(minThreshold),
      maxCapacity: Number(maxCapacity),
      avgPrice: Number(avgPrice),
      lastUpdated: new Date()
    });

    const savedItem = await inventoryItem.save();

    return NextResponse.json(savedItem, { status: 201 });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to create inventory item' },
      { status: 500 }
    );
  }
}