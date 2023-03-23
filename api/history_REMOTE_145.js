const { bcrypt, crypto, History, jwt, JWT_SECRET, mongoose, express } = require('../modules');
const router = express.Router();
//TO-DO: remove unneeded dependencies above when finished ^^^

//TO-DO: JWT
router.post('/api/history-new', async (req, res) => {
    const { userID, restaurantID, liked } = req.body;
    try {

        // Check if a user has a history already
        const existingHistory = await History.findOne({ userID : userID, restaurantID : restaurantID });
        if (existingHistory) {
            
            existingHistory.liked = liked;
            //If liked, the history should show up on the wishlist
            if (liked)
                existingHistory.isVisited = false;
            existingHistory.save();

            return res.status(200).send('History updated');
        }

        // Create a new history object in the database
        const newHistory = new History({
            userID, 
            restaurantID, 
            liked
        });
        await newHistory.save();

        // Return success
        res.status(200).send('History created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

//TO-DO: JWT
router.post('/api/history-visted', async (req, res) => {
    const { userID, restaurantID} = req.body;
    try {
        // Check if a user with the same email address already exists
        const existingHistory = await History.findOne({ userID : userID, restaurantID : restaurantID });
        if (existingHistory) {
            existingHistory.isVisited = true;
            existingHistory.save()

            return res.status(200).send('History updated');
        }
        else
        {
            return res.status(404).send('History object does not exist');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

//TO-DO: JWT
router.post('/api/history-delete', async (req, res) => {
    const { userID, restaurantID } = req.body;
    try {
        //Deletes user if they exist, returns the deleted object
        const deletedHistory = await History.findOneAndDelete({ userID : userID, restaurantID : restaurantID });
            if (deletedHistory){

                return res.status(200).send('History deleted');
            }
            else{

                return res.status(404).send('No history found');
            }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

//TO-DO: JWT, and more consise wishlist? (right now submitting every history element unabashedly)
//Also, maybe return 404 error if no items in list???
router.post('/api/wishlist', async (req, res) => {
    const { userID } = req.body;
    try {
        const wishlist = await History.find({ userID : userID, liked : true, isVisited : false});
        res.json({ wishlist });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;