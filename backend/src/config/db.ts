import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connDB = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("PORT:", process.env.PORT);
    console.log("MONGO_URI:", process.env.MONGO_URI);

    console.log(`MongoDB connected !! Host: ${connDB.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
