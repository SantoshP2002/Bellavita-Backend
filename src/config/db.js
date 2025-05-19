import {connect} from "mongoose";

const connectDB = async () => {
    try {
         await connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
        console.log(error);
        
    }
}

export default connectDB;