// Script to add WhatsApp fields to existing buyer-seller listings
// Run this if you want to add sample WhatsApp numbers to existing listings

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function addWhatsAppFields() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in environment variables');
    return;
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('buyersellers');

    // Get all listings that don't have WhatsApp fields
    const listings = await collection.find({
      $or: [
        { userWhatsApp: { $exists: false } },
        { contactWhatsApp: { $exists: false } }
      ]
    }).toArray();

    console.log(`Found ${listings.length} listings to update`);

    // Update each listing to add WhatsApp fields
    for (const listing of listings) {
      const updateData = {};
      
      // Add userWhatsApp if userPhone exists
      if (listing.userPhone && !listing.userWhatsApp) {
        updateData.userWhatsApp = listing.userPhone;
      }
      
      // Add contactWhatsApp if contactPhone exists
      if (listing.contactPhone && !listing.contactWhatsApp) {
        updateData.contactWhatsApp = listing.contactPhone;
      }

      if (Object.keys(updateData).length > 0) {
        await collection.updateOne(
          { _id: listing._id },
          { $set: updateData }
        );
        console.log(`Updated listing ${listing._id} with WhatsApp fields`);
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await client.close();
  }
}

addWhatsAppFields();