require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDatabase = require("./config/database");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            success: false,
            message: "Too many requests. Please try again later."
        }
    })
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "WM Digitals API is running."
    });
});

app.use("/api/contact", contactRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

app.use(errorHandler);

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`
==================================
WM DIGITALS SERVER STARTED
Running on port ${PORT}
==================================
        `);
    });
});
