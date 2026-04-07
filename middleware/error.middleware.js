

const errorMiddlewareHandler = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        error.statusCode = err.statusCode;

        if (err.name === 'CastError') {
            const message = `Resource not found ${err.value}`;
            error = new Error(message);
            error.statusCode = 404;
        }
        if (err.statusCode === 11000) {
            const message = "Resource already exists";
            error = new Error(message);
            error.statusCode = 400;
        }
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new Error(message);
            error.statusCode = 400;
        }
        if (err.name === 'JsonWebTokenError') {
            const message = "Invalid token";
            error = new Error(message);
            error.statusCode = 401;
        }
        if (err.name === 'TokenExpiredError') {
            const message = "Token expired";
            error = new Error(message);
            error.statusCode = 401;
        }
        if (err.code === 'LIMIT_FILE_SIZE') {
            const message = 'File is too large. Please upload a smaller file.';
            error = new Error(message);
            error.statusCode = 413;
        }
        if (err.type === 'entity.too.large') {
            const message = 'Request payload is too large.';
            error = new Error(message);
            error.statusCode = 413;
        }
        if (err.statusCode === 429) {
            const message = 'Too many requests, please try again later.';
            error = new Error(message);
            error.statusCode = 429;
        }
        if (err.type === 'StripeCardError') {
            error = new Error(err.message);
            error.statusCode = 402;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            status: error.statusCode || 500,
            message: error.message || "Internal server error"
        })
    } catch (error) {
        next(error);
    }
}


export default errorMiddlewareHandler;
