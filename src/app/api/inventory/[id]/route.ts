import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import Inventory from '@/lib/models/Inventory';

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

    // Check if item exists and belongs to user
    const existingItem = await Inventory.findOne({
      _id: id,
      userId: session.user.email
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    // Check if name conflicts with another item (excluding current item)
    const nameConflict = await Inventory.findOne({
      userId: session.user.email,
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      _id: { $ne: id }
    });

    if (nameConflict) {
      return NextResponse.json(
        { error: 'An item with this name already exists in your inventory' },
        { status: 409 }
      );
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        category,
        currentStock: Number(currentStock),
        unit,
        minThreshold: Number(minThreshold),
        maxCapacity: Number(maxCapacity),
        avgPrice: Number(avgPrice),
        lastUpdated: new Date()
      },
      { new: true }
    );

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to update inventory item' },
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

    // Check if item exists and belongs to user
    const existingItem = await Inventory.findOne({
      _id: id,
      userId: session.user.email
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    await Inventory.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to delete inventory item' },
      { status: 500 }
    );
  }
}