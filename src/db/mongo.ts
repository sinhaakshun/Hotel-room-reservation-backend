import mongoose from "mongoose";

class MongoDB {
  private static instance: MongoDB;

  private constructor() {}

  static getInstance() {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URL as string);
      console.log("MongoDB connected");
    } catch (e) {
      console.error("Error connecting Mongo:", e);
      process.exit(1);
    }
  }
}

export default MongoDB;
