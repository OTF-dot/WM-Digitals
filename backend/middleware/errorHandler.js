function errorHandler(error, req, res, next) {
    console.error(error);

    if(error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: Object.values(error.errors).map((item) => item.message)
        });
    }

    res.status(500).json({
        success: false,
        message: "Something went wrong on the server."
    });
}

module.exports = errorHandler;
