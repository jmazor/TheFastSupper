const request = require('supertest');
const app = require('../app');
const { User, History, mongoose, createToken } = require('../modules');
const user = require('../models/user');

// Helper function to create a dummy user
const createDummyUser = async (email = 'history@example.com') => {
  User.deleteOne({ email });
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


// Helper function to create a dummy history
const createDummyHistory = async (userID, restaurantID, liked) => {
  const history = new History({
    userID,
    restaurantID,
    liked,
  });

  await history.save();
  return history;
};

// Helper function to generate a dummy token
const generateDummyToken = (user) => {
  // Add your JWT token generation logic here
    return token = createToken(user);
};

describe('History API', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(0);
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({ email: 'history@example.com'});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });

  // Test cases for /api/history-new
  test('POST /api/history-new - create a new history', async () => {
    const dummyUser = await createDummyUser();
    const dummyToken = generateDummyToken(dummyUser);
    const dummyRestaurantID = '6415827f446cd39216f43e99';

    const response = await request(app)
      .post('/api/history-new')
      .send({
        token: dummyToken,
        restaurantID: dummyRestaurantID,
        liked: true,
      });

    expect(response.status).toBe(200);
    const history = await History.findOne({ userID: dummyUser._id, restaurantID: dummyRestaurantID });
    expect(history).toBeTruthy();
    expect(history.liked).toBe(true);

    await dummyUser.deleteOne();
    await history.deleteOne();
  });

  // Test cases for /api/history-visited
  test('POST /api/history-visited - mark history as visited', async () => {
    const dummyUser = await createDummyUser();
    const dummyToken = generateDummyToken(dummyUser);
    const dummyRestaurantID = '6415827f446cd39216f43e99';
    const dummyHistory = await createDummyHistory(dummyUser._id, dummyRestaurantID, true);

    const response = await request(app)
      .post('/api/history-visited')
      .send({
        token: dummyToken,
        restaurantID: dummyRestaurantID,
      });

    expect(response.status).toBe(200);
    const updatedHistory = await History.findOne({ userID: dummyUser._id, restaurantID: dummyRestaurantID });
    expect(updatedHistory.isVisited).toBe(true);

    await dummyUser.deleteOne();
    await updatedHistory.deleteOne();
  });
    // Test cases for /api/history-delete
    test('POST /api/history-delete - delete history', async () => {
        const dummyUser = await createDummyUser();
        const dummyToken = generateDummyToken(dummyUser);
        const dummyRestaurantID = '507f1f77bcf86cd799439011';
        const dummyHistory = await createDummyHistory(dummyUser._id, dummyRestaurantID, true);
    
        const response = await request(app)
          .post('/api/history-delete')
          .send({
            token: dummyToken,
            restaurantID: dummyRestaurantID,
          });
    
        expect(response.status).toBe(200);
        const deletedHistory = await History.findOne({ userID: dummyUser._id, restaurantID: dummyRestaurantID });
        expect(deletedHistory).toBeNull();
    
        await dummyUser.deleteOne();
      });
    
      // Test cases for /api/wishlist
      test('POST /api/wishlist - get wishlist', async () => {
        const dummyUser = await createDummyUser();
        const dummyToken = generateDummyToken(dummyUser);
        const dummyRestaurantID1 = '507f1f77bcf86cd799439011';
        const dummyRestaurantID2 = '6415827f446cd39216f43e99';
        const dummyHistory1 = await createDummyHistory(dummyUser._id, dummyRestaurantID1, true);
        const dummyHistory2 = await createDummyHistory(dummyUser._id, dummyRestaurantID2, true);
    
        const response = await request(app)
          .post('/api/wishlist')
          .send({
            token: dummyToken,
          });
    
        expect(response.status).toBe(200);
        expect(response.body.wishlist.length).toBe(2);
        expect(response.body.wishlist.some(item => item.restaurantID.toString() === dummyRestaurantID1)).toBe(true);
        expect(response.body.wishlist.some(item => item.restaurantID.toString() === dummyRestaurantID2)).toBe(true);
    
        await dummyUser.deleteOne();
        await dummyHistory1.deleteOne();
        await dummyHistory2.deleteOne();
      });
    });
    