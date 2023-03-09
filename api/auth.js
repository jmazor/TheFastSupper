// Load environment variables from .env file
const { crypto, User, nodemailer, jwt, JWT_SECRET } = require('../modules.js');

router.post('/api/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        // Check if a user with the same email address already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('Email already registered');
        }

        // Create a new user in the database
        const token = crypto.randomBytes(16).toString('hex');
        const user = new User({
            email,
            password,
            firstName,
            lastName,
            verificationToken: token
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
router.post('/api/login', async (req, res) => {
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

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send the token to the client
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.get('/api/logout', async (req, res) => {
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
            { _id: new mongoose.Types.ObjectId(user._id) },
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
        const verificationUrl = `https://fastsupper.herokuapp.com/verify-email?token=${verificationToken}`;

        // Create a Nodemailer transport object
        const transporter = nodemailer.createTransport({
            // Replace with your SMTP settings
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });

        // Define the email message
        const mailOptions = {
            from: process.env.SMTP_USERNAME,
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


module.exports = router;