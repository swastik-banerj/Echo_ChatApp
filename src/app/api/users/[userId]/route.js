import User from "../../../../../models/User.model";
import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}){

    const {userId} = await params;
  
    try {

        await connectDB();

       const user = await User.findById(userId);

        if(user){
            return NextResponse.json({
                success: true,
                message: "User found successfully",
                user
            })
        }

        return NextResponse.json(user, {
                success: false,
                message: "User not found"
            })

        
    } catch (error) {
        console.log("error while getting user : ", error)
        return NextResponse.json({
            success: false,
            message: "Can't get user"
        });
    }
}

