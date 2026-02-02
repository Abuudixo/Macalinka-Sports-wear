const errorHandler = (err, req, res, next) => {
    console.error('ERROR HANDLER:', err.stack || err.message || err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Server Error';

    // Mongoose Duplicate Key
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // Mongoose Cast Error
    if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;
