const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

router.get(
    "/dashboard",
    isAuthenticated,
    authorizeRoles("provider", "admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome to provider dashboard",
            provider: req.user,
        });
    }
);

module.exports = router;
