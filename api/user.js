const express = require('express');
const router = express.Router();
const { Restaurant, returnUser, refresh } = require('../modules');

// Route to get 10 random restaurants
router.post('/api/restaurants', async (req, res) => {
  try { 
    if(returnUser(req.body.token) == null)
      return res.status(401).send('Token unverified or expired');

    let query = {};

    if (req.body.category) {
      query = { 'categories.alias': req.body.category };
    }

    const randomRestaurants = await Restaurant.aggregate([
      { $match: query },
      { $sample: { size: 10 } }
    ]).exec();
    token = refresh(req.body.token);

    res.json({randomRestaurants, token});

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
