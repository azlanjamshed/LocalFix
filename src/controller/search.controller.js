const Provider = require("../models/provider.model");

// searchProviders = async (req, res) => {
//     try {
//         const { lat, lng, service, distance = 5000 } = req.query;

//         if (!lat || !lng) {
//             return res.status(400).json({ message: "Latitude and longitude required" });
//         }

//         const query = {
//             isActive: true,
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [Number(lng), Number(lat)],
//                     },
//                     $maxDistance: Number(distance), // meters
//                 },
//             },
//         };

//         // Optional service filter
//         if (service) {
//             query["services.name"] = service;
//         }

//         const providers = await Provider.find(query)
//             .populate("userId", "name email")
//             .limit(20);

//         res.status(200).json({
//             success: true,
//             count: providers.length,
//             providers,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

searchProviders = async (req, res) => {
    try {
        const lat = Number(req.query.lat);
        const lng = Number(req.query.lng);
        const distance = Number(req.query.distance) || 5000;

        // 🚨 VALIDATION (important)
        if (Number.isNaN(lat) || Number.isNaN(lng)) {
            return res.status(400).json({
                message: "Invalid latitude or longitude",
            });
        }

        const providers = await Provider.find({
            isActive: true,
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat], // ❗ lng first
                    },
                    $maxDistance: distance,
                },
            },
        });

        res.status(200).json({
            success: true,
            count: providers.length,
            providers,
        });
    } catch (error) {
        console.error("SEARCH ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};
module.exports = { searchProviders }