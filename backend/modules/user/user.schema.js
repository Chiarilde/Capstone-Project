import { mongoose } from "mongoose";
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        companyName: {
            type: String,
            required: false,
        },

        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Venue",
            },
        ],

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
        strict: true,
    },
);

export default mongoose.model("User", userSchema);
