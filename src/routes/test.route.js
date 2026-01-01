const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth.middleware");

router.get("/me", isAuthenticated, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

module.exports = router;
