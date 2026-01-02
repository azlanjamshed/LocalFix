const Booking = require("../models/booking.model");
const Provider = require("../models/provider.model");

// 🔹 Create Booking
createBooking = async (req, res) => {
    try {
        const { providerId, serviceName, date, slot } = req.body;

        if (!providerId || !serviceName || !date || !slot) {
            return res.status(400).json({ message: "All fields required" });
        }

        // ❌ Prevent double booking
        const existingBooking = await Booking.findOne({
            providerId,
            date,
            slot,
            status: { $in: ["PENDING", "CONFIRMED"] },
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "This slot is already booked",
            });
        }

        const booking = await Booking.create({
            userId: req.user._id,
            providerId,
            serviceName,
            date,
            slot,
        });

        res.status(201).json({
            success: true,
            booking,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Provider confirms booking
confirmBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "CONFIRMED";
        await booking.save();

        // increase provider booking count
        await Provider.findByIdAndUpdate(booking.providerId, {
            $inc: { totalBookings: 1 },
        });

        res.json({
            success: true,
            booking,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { confirmBooking, createBooking }