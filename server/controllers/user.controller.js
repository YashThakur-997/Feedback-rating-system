const db = require('../models/db.connection');

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getUsers(req, res, next) {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
}

async function getReviews(req, res, next) {
  try {
    // Use backticks for multi-line SQL and to allow single quotes inside the query
    const query = `
      SELECT 
        u.name AS 'Reviewer', 
        p.product_name AS 'Item Reviewed', 
        r.rating_value AS 'Stars', 
        r.feedback_text AS 'Comment',
        r.status AS 'Status'
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN products p ON r.product_id = p.product_id
    `;
    
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
}


async function addUser(req, res, next) {
  const { name, email } = req.body;

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name.trim(), email.trim()]
    );

    return res.status(201).json({
      id: result.insertId,
      name: name.trim(),
      email: email.trim()
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  addUser,
  getReviews
};