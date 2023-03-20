const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Restaurant, JWT_SECRET } = require('../modules');

// TODO: Add authentication middleware

// Route to get 10 random restaurants
router.post('/api/restaurants', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Authorization header missing');
    }

    // Get the JWT token from the authorization header
    const token = authHeader.split(' ')[1];
    // Verify the JWT token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    let query = {};

    if (req.body.category) {
      query = { 'categories.alias': req.body.category };
    }

    const randomRestaurants = await Restaurant.aggregate([
      { $match: query },
      { $sample: { size: 10 } }
    ]).exec();

    res.json(randomRestaurants);

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
