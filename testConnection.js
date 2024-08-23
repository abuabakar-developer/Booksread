const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mu712576:trymCnCJnN8MC1jg@cluster0.hqrrotr.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    await client.close();
  }
}

testConnection();
   