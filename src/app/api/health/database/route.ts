import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Test database connection
    const db = await getDatabase();
    
    // Perform a simple operation to verify connection
    const result = await db.admin().ping();
    
    return NextResponse.json({
      status: 'connected',
      database: db.databaseName,
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
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}