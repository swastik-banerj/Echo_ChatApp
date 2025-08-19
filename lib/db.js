import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    if(isConnected) return;

    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "echo_chat"
        });

        isConnected=true;
        console.log("MongoDB connected")
        
    } catch (error) {
        console.log("MongoDB not connected : ", error);
    }
}
