const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const {
    createBooking,
    confirmBooking,
} = require("../controller/booking.controller");

// User creates booking
router.post(
    "/",
    isAuthenticated,
    authorizeRoles("user"),
    createBooking
);

// Provider confirms booking
router.put(
    "/:id/confirm",
    isAuthenticated,
    authorizeRoles("provider"),
    confirmBooking
);

module.exports = router;
