import User from "../../../../models/User.model";
import { connectDB } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    let users = [];

    try {

        await connectDB();

        users = await User.find();

        if(users){
            return NextResponse.json(users, {
                success: true,
                message: "Users found successfully"
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Can't get users"
        });
    }
}
