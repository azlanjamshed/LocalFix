const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { upsertProviderProfile, getMyProviderProfile } = require("../controller/provider.controller");

// Create / Update profile
router.post(
    "/profile",
    isAuthenticated,
    authorizeRoles("provider"),
    upsertProviderProfile
);

// Get own profile
router.get(
    "/profile/me",
    isAuthenticated,
    authorizeRoles("provider"),
    getMyProviderProfile
);

module.exports = router;
