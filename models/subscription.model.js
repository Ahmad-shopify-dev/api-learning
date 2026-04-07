import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Price is required for Subscription"],
        min: [0, "Price must be greater than 0"],
        max: [1000, "Price must be less than 1000"]
    },
    currency: {
        type: String,
        enum: ["INR", "USD", "PKR", "GBP"],
        default: 'PKR'
    },
    frequency: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Yearly"]
    },
    category: {
        type: String,
        enum: ["Fitness", "Health", "Education", "Entertainment", "Productivity", "Finance", "Food", "Travel", "Other"],
        required: [true, "Category is required"]
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "inactive", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now(),
        validate: {
            validator: function (value) {
                return value <= Date.now();
            },
            message: "Start date must be in the past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: "Renewal date must be greater than start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index: true
    }
}, { timestaps: true })


subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const timePeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + timePeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
})


const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
