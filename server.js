// Sets up a server
const { path, mongoose } = require('./modules');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.set('port', PORT);

const server = app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

module.exports = server;
