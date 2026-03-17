function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found.' });
}

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  const response = {
    error: statusCode === 500 ? 'Internal server error.' : error.message
  };

  if (process.env.NODE_ENV !== 'production') {
    response.details = error.message;
  }

  res.status(statusCode).json(response);
}

module.exports = {
  notFoundHandler,
  errorHandler
};