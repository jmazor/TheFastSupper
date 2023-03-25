const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to the MongoDB server
const uri = 'mongodb://127.0.0.1:27017/FastSupper';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to server');

  // Define the schema for the Users collection
  const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    picture: { type: String, default: null },
    changePassword: { type: Boolean, default: false },
  });
  usersSchema.index({ email: 1 }, { unique: true });
  const User = mongoose.model('User', usersSchema);

  // Define the schema for the Restaurants collection
  const restaurantsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    foodType: [{ type: String, required: true }],
    price: { type: Number, default: null },
    rating: { type: Number, default: null },
    hours: { type: String, default: null },
    pictures: [{ type: String, default: null }],
    phone: { type: String, default: null },
  });
  restaurantsSchema.index({ location: 1 });
  restaurantsSchema.index({ foodType: 1 });
  const Restaurant = mongoose.model('Restaurant', restaurantsSchema);

  // Define the schema for the wishList collection
  const wishListSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    isRated: { type: Boolean, required: true },
    date: { type: Date, default: Date.now, required: true },
    visited: { type: Boolean, required: true },
  });
  wishListSchema.index({ userID: 1 });
  wishListSchema.index({ restaurantID: 1 });
  const WishList = mongoose.model('WishList', wishListSchema);

  // Define the schema for the ratings collection
  const ratingsSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, default: null },
    favorite: { type: Boolean, required: true },
  });
  ratingsSchema.index({ userID: 1 });
  ratingsSchema.index({ restaurantID: 1 });
  const Rating = mongoose.model('Rating', ratingsSchema);
  Promise.all([
    User.create([
      {
        email: 'john.doe@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        picture: null
      },
      {
        email: 'jane.doe@example.com',
        password: 'password',
        firstName: 'Jane',
        lastName: 'Doe',
        picture: null
      },
      {
        email: 'bob.smith@example.com',
        password: 'password',
        firstName: 'Bob',
        lastName: 'Smith',
        picture: null
      },
      {
        email: 'alice.johnson@example.com',
        password: 'password',
        firstName: 'Alice',
        lastName: 'Johnson',
        picture: null
      },
      {
        email: 'david.hernandez@example.com',
        password: 'password',
        firstName: 'David',
        lastName: 'Hernandez',
        picture: null
      }
    ]),
    Restaurant.create([
      {
        name: 'Pasta Palace',
        location: 'New York',
        foodType: ['Italian', 'Pasta'],
        price: 20,
        rating: 4.5,
        hours: '11am-10pm',
        pictures: [],
        phone: '212-555-1234'
      },
      {
        name: 'Burger Bistro',
        location: 'San Francisco',
        foodType: ['Burgers', 'American'],
        price: 15,
        rating: 4.0,
        hours: '10am-9pm',
        pictures: [],
        phone: '415-555-1234'
      },
      {
        name: 'Sushi Garden',
        location: 'Los Angeles',
        foodType: ['Sushi', 'Japanese'],
        price: 30,
        rating: 4.2,
        hours: '12pm-11pm',
        pictures: [],
        phone: '213-555-1234'
      },
      {
        name: 'Taco Town',
        location: 'Austin',
        foodType: ['Mexican', 'Tacos'],
        price: 10,
        rating: 3.8,
        hours: '9am-10pm',
        pictures: [],
        phone: '512-555-1234'
      },
      {
        name: 'Pizza Planet',
        location: 'Orlando',
        foodType: ['Pizza', 'Italian'],
        price: 25,
        rating: 4.6,
        hours: '11am-12am',
        pictures: [],
        phone: '407-555-1234'
      }
    ])
  ])
  .then(function(results) {
    console.log(`Inserted ${results[0].length} documents into the Users collection`);
    console.log(`Inserted ${results[1].length} documents into the Restaurants collection`);
    (async function() {
      await saveObjectIDs();
      mongoose.connection.close();
    })();
    
  })
  .catch(function(err) {
    console.error('Error inserting documents:', err);
  });

  async function saveObjectIDs() {
    const johnDoe = await User.findOne({ email: 'john.doe@example.com' });
    const janeDoe = await User.findOne({ email: 'jane.doe@example.com' });
    const bobSmith = await User.findOne({ email: 'bob.smith@example.com' });
    const aliceJohnson = await User.findOne({ email: 'alice.johnson@example.com' });
    const davidHernandez = await User.findOne({ email: 'david.hernandez@example.com' });

    const pastaPalace = await Restaurant.findOne({ name: 'Pasta Palace' });
    const burgerBistro = await Restaurant.findOne({ name: 'Burger Bistro' });
    const sushiGarden = await Restaurant.findOne({ name: 'Sushi Garden' });
    const tacoTown = await Restaurant.findOne({ name: 'Taco Town' });
    const pizzaPlanet = await Restaurant.findOne({ name: 'Pizza Planet' });
    console.log("Saved IDS");
    await WishList.create([
        {
          userID: johnDoe._id,
          restaurantID: pastaPalace._id,
          isRated: true,
          date: new Date(),
          visited: false
        },
        {
          userID: janeDoe._id,
          restaurantID: sushiGarden._id,
          isRated: false,
          date: new Date(),
          visited: true
        },
        {
          userID: bobSmith._id,
          restaurantID: burgerBistro._id,
          isRated: false,
          date: new Date(),
          visited: true
        },
        {
          userID: aliceJohnson._id,
          restaurantID: pizzaPlanet._id,
          isRated: true,
          date: new Date(),
          visited: true
        },
        {
          userID: davidHernandez._id,
          restaurantID: tacoTown._id,
          isRated: false,
          date: new Date(),
          visited: false
        }
      ]);
      await Rating.create([
        {
          userID: johnDoe._id,
          restaurantID: pastaPalace._id,
          rating: 4,
          comment: 'Great pasta!',
          favorite: true
        },
        {
          userID: janeDoe._id,
          restaurantID: sushiGarden._id,
          rating: 3.5,
          comment: null,
          favorite: false
        },
        {
          userID: bobSmith._id,
          restaurantID: burgerBistro._id,
          rating: 4.5,
          comment: 'Best burgers in town!',
          favorite: true
        },
        {
          userID: aliceJohnson._id,
          restaurantID: pizzaPlanet._id,
          rating: 5,
          comment: 'Amazing pizza!',
          favorite: true
        },
        {
          userID: davidHernandez._id,
          restaurantID: tacoTown._id,
          rating: 2,
          comment: 'Not very good tacos.',
          favorite: false
        }
      ]); 
}


});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

mongoose.connection.on('error', function(err) {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('reconnected', function() {
  console.log('Mongoose connection reconnected');
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open');
});
