import mongoose from "mongoose";

const db_Connect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Database is already connected.");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://prashantmn17:prashantmn17@cluster0.7c3is.mongodb.net/FinApp"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default db_Connect;
