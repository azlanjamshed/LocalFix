const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.route")
const testRoutes = require("../src/routes/test.route")
const providerRoutes = require("../src/routes/provider.route")
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/provider", providerRoutes);
app.get("/", (req, res) => {
    res.send("🚀 LocalFix API running");
});

module.exports = app;
