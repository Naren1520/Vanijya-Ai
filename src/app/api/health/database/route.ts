import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Test database connection
    await connectToDatabase();
    
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    // Perform a simple operation to verify connection
    const db = mongoose.connection.db;
    const result = await db?.admin().ping();
    
    return NextResponse.json({
      status: 'connected',
      database: db?.databaseName || 'vanijya_ai',
      readyState: mongoose.connection.readyState,
      timestamp: new Date().toISOString(),
      ping: result
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to database',
        error: error instanceof Error ? error.message : 'Unknown error',
        readyState: mongoose.connection.readyState,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}