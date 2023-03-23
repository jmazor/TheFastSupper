const {History, express } = require('../modules');
const router = express.Router();
const manageJWT = require('../manageJWT');

//TO-DO: Send better messages upon success
router.post('/api/history-new', async (req, res) => {
    const { token, restaurantID, liked } = req.body;
    try {

        //JWT verification
        let userID = manageJWT.returnUser(token);
        if (userID == null)
        {
            return res.status(401).send('Token unverified or expired');
        }

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

        let newToken = manageJWT.refresh( token );

        // History created successfully
        res.status(200).send({ token : newToken });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

//TO-DO: Send better messages upon success
router.post('/api/history-visted', async (req, res) => {
    const { token, restaurantID } = req.body;
    try {
        
        //JWT verification
        let userID = manageJWT.returnUser(token);
        if (userID == null)
        {
            return res.status(401).send('Token unverified or expired');
        }
    
        //Find a user
        const visitedHistory = await History.findOne({ userID : userID, restaurantID : restaurantID });
        if (visitedHistory){
            visitedHistory.isVisited = true;
            visitedHistory.save();

            let newToken = manageJWT.refresh(token);

            //History visted updated
            return res.status(200).send({ token: newToken });
        }
        else{

            return res.status(404).send('No History found') ;
        }
    }catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

//TO-DO: Send better messages upon success
router.post('/api/history-delete', async (req, res) => {
    const { token, restaurantID } = req.body;
    try {
        
        //JWT verification
        let userID = manageJWT.returnUser(token);
        if (userID == null)
        {
            return res.status(401).send('Token unverified or expired');
        }

        //Deletes user if they exist, returns the deleted object
        const deletedHistory = await History.findOneAndDelete({ userID : userID, restaurantID : restaurantID });
            if (deletedHistory){

                let newToken = manageJWT.refresh(token);

                //History deleted
                return res.status(200).send({ token: newToken });
            }
            else{

                return res.status(404).send('No history found');
            }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

//TO-DO: Send better messages upon success
//TO-DO: More consise wishlist? (right now submitting every history element unabashedly)
//Also, maybe return 404 error if no items in list???
router.post('/api/wishlist', async (req, res) => {
    const { token } = req.body;
    try {
        
        //JWT verification
        let userID = manageJWT.returnUser(token);
        if (userID == null)
        {
            return res.status(401).send('Token unverified or expired');
        }

        const wishlist = await History.find({ userID : userID, liked : true, isVisited : false});

        let newToken = manageJWT.refresh(token);

        //return wishlist
        res.json({ token : newToken, wishlist });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;