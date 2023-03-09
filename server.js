// Import necessary modules
const { express, app, bodyParser, path, mongoose } = require('./modules.js');

// Set default port for server
const PORT = process.env.PORT || 5000;

// Set the port for the server
app.set('port', PORT);

// Add middleware to parse JSON data in incoming requests
app.use(bodyParser.json());

// Connect to MongoDB database
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define routes for the API
const authRouter = require('./api/auth');

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.use(authRouter);
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
