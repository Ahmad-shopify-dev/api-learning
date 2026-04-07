import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value)
            },
            message: "Name must contain only alphabets and spaces"
        }
    },
    email: {
        type: String,
        required: [true, "E-mail is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (usermail) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(usermail)
            },
            message: "E-mail is invalid"
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;


