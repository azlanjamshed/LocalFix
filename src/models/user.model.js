const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // ❗ security
        },

        role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },

        // 📍 location (used later)
        location: {
            lat: Number,
            lng: Number,
            city: String,
        },

        // 💳 Subscription (future-ready)
        isSubscribed: {
            type: Boolean,
            default: false,
        },

        subscriptionId: {
            type: String,
            default: null,
        },

        subscriptionPlan: {
            type: String,
            default: null,
        },

        subscriptionExpiresAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);


// 🔐 Hash password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);

});

// 🔑 Compare password
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = mongoose.model("User", userSchema);
