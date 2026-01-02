const express = require("express");
const router = express.Router();
const { searchProviders } = require("../controller/search.controller");

router.get("/providers", searchProviders);

module.exports = router;
