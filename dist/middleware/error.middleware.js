export const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};
