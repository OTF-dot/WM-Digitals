const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const Contact = require("../models/Contact");

const router = express.Router();

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many contact attempts. Please try again later."
    }
});

function cleanText(value) {
    return String(value || "")
        .trim()
        .replace(/\s+/g, " ");
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactPayload(payload) {
    const name = cleanText(payload.name);
    const email = cleanText(payload.email).toLowerCase();
    const message = cleanText(payload.message);
    const errors = [];

    if(name.length < 2 || name.length > 80) {
        errors.push("Name must be between 2 and 80 characters.");
    }

    if(!isValidEmail(email) || email.length > 120) {
        errors.push("Please provide a valid email address.");
    }

    if(message.length < 10 || message.length > 2000) {
        errors.push("Message must be between 10 and 2000 characters.");
    }

    return {
        data: { name, email, message },
        errors
    };
}

router.post("/", contactLimiter, async (req, res, next) => {
    try {
        const { data, errors } = validateContactPayload(req.body);

        if(errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Please check your contact details.",
                errors
            });
        }

        if(mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                message: "Contact service is temporarily unavailable."
            });
        }

        const contact = await Contact.create(data);

        res.status(201).json({
            success: true,
            message: "Your message has been received. WM Digitals will reply soon.",
            data: {
                id: contact._id,
                status: contact.status,
                createdAt: contact.createdAt
            }
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;
