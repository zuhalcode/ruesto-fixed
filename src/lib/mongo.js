import mongoose from "mongoose";

export const connect = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connection to MongoDB opened");
    } else {
      console.log("Already connected to MongoDB");
    }
  } catch (err) {
    console.log("Error connecting to MongoDB:", err.message);
  }
};

export const disconnect = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("Connection to MongoDB closed");
    } else {
      console.log("Already disconnected from MongoDB");
    }
  } catch (err) {
    console.log("Error closing the MongoDB:", err.message);
  }
};
