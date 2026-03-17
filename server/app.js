const express = require('express');
const userRoutes = require('./routes/user.routes');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/users', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;