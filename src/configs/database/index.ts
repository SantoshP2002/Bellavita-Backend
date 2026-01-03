import mongoose from "mongoose";
import { MONGODB_URI, IS_DEV } from "../../env";

// TypeScript global augmentation
declare global {
  var mongooseConn: typeof mongoose | null;
}

// Connection config interface
interface IMongoOptions {
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
  maxPoolSize: number;
  minPoolSize?: number;
}

// Connection cache
let cachedConnection: typeof mongoose | null = global.mongooseConn || null;

// Default connection options
const MONGO_OPTIONS: IMongoOptions = {
  serverSelectionTimeoutMS: 5000, // 5 seconds connection timeout
  socketTimeoutMS: 45000, // 45 seconds query timeout
  maxPoolSize: 10, // Max connections in pool
  minPoolSize: 2, // Min connections to maintain
};

/**
 * Establishes or returns cached MongoDB connection
 * @returns {Promise<typeof mongoose>} Mongoose connection
 * @throws {Error} If connection fails
 */

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cachedConnection) {
    console.log("🚀 Using cached MongoDB connection");
    return cachedConnection;
  }

  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable not defined");
    }

    console.log("🔌 Establishing new MongoDB connection...");

    const newConnection = await mongoose.connect(MONGODB_URI, {
      ...MONGO_OPTIONS,
      ...(IS_DEV === "true" && {
        maxPoolSize: 5, // Smaller pool for dev
        minPoolSize: 1,
      }),
    });

    // Store in global variable for dev hot-reload
    if (IS_DEV === "true") {
      global.mongooseConn = newConnection;
    }

    cachedConnection = newConnection;
    console.log("✅ MongoDB connected successfully");

    // Connection event handlers
    newConnection.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      cachedConnection = null;
    });

    newConnection.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
      cachedConnection = null;
    });

    return newConnection;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    cachedConnection = null;
    throw error;
  }
};
