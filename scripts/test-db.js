const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'vanijya_ai';

  if (!uri) {
    console.error('❌ MONGODB_URI not found in environment variables');
    console.log('Please add your MongoDB connection string to .env.local');
    process.exit(1);
  }

  console.log('🔄 Testing MongoDB connection...');
  console.log(`Database: ${dbName}`);

  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');

    // Test database access
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    console.log(`📊 Database "${dbName}" is accessible`);
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }

    // Test a simple operation
    const testCollection = db.collection('connection_test');
    const testDoc = { 
      test: true, 
      timestamp: new Date(),
      message: 'MongoDB connection test successful'
    };
    
    await testCollection.insertOne(testDoc);
    console.log('✅ Write operation successful');
    
    await testCollection.deleteOne({ test: true });
    console.log('✅ Delete operation successful');
    
    console.log('🎉 MongoDB is ready for Vanijya AI!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Ensure the database user has proper permissions');
      console.log('3. Verify special characters in password are URL-encoded');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the cluster URL is correct');
      console.log('3. Ensure your IP address is whitelisted in MongoDB Atlas');
    }
    
    process.exit(1);
  } finally {
    await client.close();
  }
}

testConnection();