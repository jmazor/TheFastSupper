// npm install express mongoose bcrypt crypto nodemailer express-session
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//const crypto = require('crypto');
const nodemailer = require('nodemailer');
const session = require('express-session');

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();

app.set('port', (process.env.PORT || 5000));

const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
// TODO
app.use(session({
    secret: 'somethingshouldgohere',
    resave: false,
    saveUninitialized: true
  }));


const { Schema } = mongoose;
const uri = 'mongodb://127.0.0.1:27017/FastSupper';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// TODO create a file for users schema
// Define the schema for the Users collection
const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    picture: { type: String, default: null },
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

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('Verification token is missing');
    }

    try {
        // Look up the user by verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update the user's email verification status
        const result = await User.updateOne(
            { _id: mongoose.Types.ObjectId(user._id) },
            { $set: { isEmailVerified: true, verificationToken: null } }
        );
        if (result.nModified === 0) {
            return res.status(500).send('Failed to update user');
        }

        // Redirect to the login page
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Function to send verification email to user
const sendVerificationEmail = async (email, verificationToken) => {
    try {
        // Generate a verification URL using the user's verification token
        const verificationUrl = `http://example.com/verify-email?token=${verificationToken}`;

        // Create a Nodemailer transport object
        const transporter = nodemailer.createTransport({
            // Replace with your SMTP settings
            host: 'SMTPSERVER',
            port: 465,
            auth: {
                user: 'EMAIL',
                pass: 'PASSWORD'
            }
        });

        // Define the email message
        const mailOptions = {
            from: 'EMAIL',
            to: email,
            subject: 'Verify your email address',
            html: `Please click the following link to verify your email address: <a href="${verificationUrl}">${verificationUrl}</a>`
        };

        // Send the email
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
        throw new Error('Error sending verification email');
    }
};

// Signup endpoint
// TODO deal with errors
app.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Create a new user in the database
        const user = new User({
            email,
            password,
            firstName,
            lastName,
            verificationToken: Math.random().toString(36).substr(2, 8)
        });
        await user.save();

        // Send verification email to the user
        await sendVerificationEmail(user.email, user.verificationToken);

        // Return a success response
        res.status(200).send('User created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// TODO redis for storing sessions
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Look up the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Check if the email has been verified
        if (!user.isEmailVerified) {
            return res.status(400).send('Please verify your email address to log in');
        }

        // Compare the password hash
        // TODO use bcrypt
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = (password === user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        // Create a session
        req.session.user = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture
        };

        // Return a success response
        res.status(200).send('Login successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


router.get('/logout', async (req, res) => {
    try {
        // Destroy the user's session
        req.session.destroy(err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
            } else {
                // Redirect to the login page
                res.redirect('/login');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

const authMiddleware = (req, res, next) => {
    if (req.session.user && req.session.user._id) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
};

router.get('/api/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.use('/', router);
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});