const Provider = require("../models/provider.model");



// 🔹 Create or Update Provider Profile
upsertProviderProfile = async (req, res) => {
    try {
        const provider = await Provider.findOneAndUpdate(
            { userId: req.user._id },
            {
                userId: req.user._id,
                services: req.body.services,
                availability: req.body.availability,
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Provider profile saved successfully",
            provider,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Get Provider Profile (self)
getMyProviderProfile = async (req, res) => {
    try {
        const provider = await Provider.findOne({ userId: req.user._id });

        if (!provider) {
            return res.status(404).json({ message: "Provider profile not found" });
        }

        res.status(200).json({ success: true, provider });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { upsertProviderProfile, getMyProviderProfile }