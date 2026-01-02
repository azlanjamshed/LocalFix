const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        services: [
            {
                name: {
                    type: String,
                    required: true, // plumber, electrician
                },
                pricePerHour: {
                    type: Number,
                    required: true,
                },
                description: String,
            },
        ],

        availability: [
            {
                date: {
                    type: String, // YYYY-MM-DD
                    required: true,
                },
                slots: {
                    type: [String], // ["10:00", "11:00"]
                    required: true,
                },
            },
        ],
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number], // [lng, lat]
                required: true,
            },
            address: String,
        },

        rating: {
            type: Number,
            default: 0,
        },

        totalBookings: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);
providerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Provider", providerSchema);
