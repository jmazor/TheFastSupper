const request = require('supertest');
const app = require('../app');
const { bcrypt, User, mongoose, createToken } = require('../modules');


describe('POST /api/auth', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(0);
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });


  it('should create a new user and return 200', async () => {
    await User.deleteOne({ email: 'test@example.com' });
    const response = await request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    expect(response.status).toBe(200);
  });

  it('should return a 409 when attempting to create the same user again', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    expect(response.status).toBe(409);
  });

  it('should verify the email address for a user with a valid token', async () => {
    // Get the user from the database
    const user = await User.findOne({ email: 'test@example.com' });
    const response = await request(app)
      .get(`/verify-email?token=${user.verificationToken}`);
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/login');

    // Verify that the user's email is now verified in the database
    const updatedUser = await User.findOne({ email: 'test@example.com' });
    expect(updatedUser.isEmailVerified).toBe(true);
    expect(updatedUser.verificationToken).toBeNull();
  });

  it('should return a 400 when the verification token is missing', async () => {
    const response = await request(app)
      .get('/verify-email');
    expect(response.status).toBe(400);
  });

  it('should return a 404 when the user is not found', async () => {
    const response = await request(app)
      .get('/verify-email?token=invalid-token');
    expect(response.status).toBe(404);
  });

  it('should log in a user with valid credentials and return a token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return a 400 when the email is invalid', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'invalid@example.com',
        password: 'password'
      });
    expect(response.status).toBe(400);
  });

  it('should return a 400 when the password is invalid', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@example.com',
        password: 'invalid-password'
      });
    expect(response.status).toBe(400);
  });

  it('should return a 400 when the email has not been verified', async () => {
    // Add a new user to the database without verifying their email
    const unverifiedUser = new User({
      email: 'unverified@example.com',
      password: 'password',
      isEmailVerified: false
    });
    await unverifiedUser.save();

    // Attempt to log in with the unverified user's credentials
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'unverified@example.com',
        password: 'password'
      });
    expect(response.status).toBe(400);

    // Delete the unverified user from the database
    await User.deleteOne({ _id: unverifiedUser._id });
  });

  it('should change the password of a user with a valid token', async () => {
    // Create a new user for the test
    await User.deleteMany({ email: 'test@example.com' });
    const newUser = new User({
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
    });
    await newUser.save();
  
    // Generate a JWT token for the user
    const jwtToken = createToken(newUser._id, newUser.email);
  
    // Change the password for the user with the JWT token
    const response = await request(app)
      .post('/api/change-password')
      .send({ 
        token: jwtToken,
        oldPassword: 'password',
        newPassword: 'newpassword'
      });
  
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/login');
  
    // Verify that the user's passworsd has been updated in the database
    const updatedUser = await User.findOne({ email: 'test@example.com' });
    const passwordMatches = await bcrypt.compare('newpassword', updatedUser.password);
    expect(passwordMatches).toBe(true);
  
    // Delete the user after the test
    await User.deleteOne({ _id: newUser._id });
  });
  
  

});
