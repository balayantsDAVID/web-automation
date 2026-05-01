import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/questrooms';

    await mongoose.connect(mongoURI);
    console.log(`MongoDB connected to: ${mongoURI.split('@').pop()}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;