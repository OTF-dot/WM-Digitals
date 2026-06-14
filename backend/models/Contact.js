const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 80
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 120
        },
        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 2000
        },
        status: {
            type: String,
            enum: ["new", "read", "replied", "archived"],
            default: "new"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);
