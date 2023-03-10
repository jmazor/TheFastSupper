const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Restaurant } = require('../../modules');
const mongoose = require('mongoose');
const restaurants = require('../restaurants.json');

// Connect to the MongoDB database
const uri = process.env.MONGODB_URI;
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/// TODO make _id the restaurant id

// Loop through each restaurant and add it to the database
Promise.all(restaurants.map((restaurant) => {
    const newRestaurant = new Restaurant(restaurant);
    return newRestaurant.save()
      .then(() => {
        console.log(`Restaurant saved: ${restaurant.name}`);
      })
      .catch((err) => {
        console.error(`Error saving restaurant: ${err}`);
      });
  }))
  .then(() => {
    console.log('All restaurants saved successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(`Error saving restaurants: ${err}`);
    mongoose.connection.close();
  });
