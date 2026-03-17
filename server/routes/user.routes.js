const express = require('express');
const { getUsers, addUser , getReviews } = require('../controllers/user.controller');

const router = express.Router();

router.get('/get', getUsers);
router.post('/add', addUser);
router.get('/reviews', getReviews);

module.exports = router;