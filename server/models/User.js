// File will be schema for user representing model of data
import mongoose from "mongoose";

// Establishing attributes for table defined as "user"
// Passes this schema into MongoDB to organized and structure user data each time
const UserSchema = new mongoose.Schema(
    {
        // Each attribute will also define list of properties and requirements
        name: { 
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        // Skipping over verification for these properties for simplicity sake
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "admin",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;