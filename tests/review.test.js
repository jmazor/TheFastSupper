const request = require('supertest');
const app = require('../app');
const { User, Restaurant, Review, mongoose, createToken } = require('../modules');

// Helper function to create a dummy user
const createDummyUser = async (email = 'review@example.com') => {
  await User.deleteOne({ email });
  const user = new User({
    email: email,
    password: 'testpassword',
    firstName: 'Test',
    lastName: 'User',
    isEmailVerified: true,
  });

  await user.save();
  return user;
};

// Helper function to create a dummy restaurant
const createDummyRestaurant = async () => {
  await Restaurant.deleteOne({ id: '000000000000000000000000' });
  const restaurant = new Restaurant({
    id: '000000000000000000000000',
    alias: 'dummy-restaurant',
    name: 'Dummy Restaurant',
  });

  await restaurant.save();
  return restaurant;
};

// Helper function to create a dummy review
const createDummyReview = async (userID, restaurantID, rating) => {
  await Review.deleteOne({ userID, restaurantID });
  const review = new Review({
    userID,
    restaurantID,
    rating,
    favorite: false,
  });

  await review.save();
  return review;
};

// Helper function to generate a dummy token
const generateDummyToken = (user) => {
  return token = createToken(user);
};

describe('Review API', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(0);
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });

  it('should create a new review and return 200', async () => {
    const dummyUser = await createDummyUser();
    const dummyToken = generateDummyToken(dummyUser);
    const dummyRestaurant = await createDummyRestaurant();

    const response = await request(app)
      .post('/api/review')
      .send({
        token: dummyToken,
        restaurantID: dummyRestaurant._id,
        rating: 4,
        review: 'Great food!',
        favorite: false
      });

    expect(response.status).toBe(200);
    const review = await Review.findOne({ userID: dummyUser._id, restaurantID: dummyRestaurant._id });
    expect(review).toBeTruthy();
    expect(review.rating).toBe(4);
    expect(review.comment).toBe('Great food!');

    await User.deleteOne({ _id: dummyUser._id });
    await Restaurant.deleteOne({ _id: dummyRestaurant._id });
    await Review.deleteOne({ _id: review._id });
  });

  it('should get reviews for a restaurant and return 200', async () => {
    const dummyUser = await createDummyUser();
    const dummyRestaurant = await createDummyRestaurant();
    const dummyReview = await createDummyReview(dummyUser._id, dummyRestaurant._id, 5);

    const response = await request(app)
      .get(`/api/review/${dummyRestaurant._id}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].rating).toBe(5);
    expect(response.body[0].userID).toEqual(dummyUser._id.toString());

    await User.deleteOne({ _id: dummyUser._id });
    await Restaurant.deleteOne({ _id: dummyRestaurant._id });
    await Review.deleteOne({ _id: dummyReview._id });
  });

});
