import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model("User", UserSchema);
