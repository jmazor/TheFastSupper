const review = require('../models/review');
const { Restaurant, express, returnUser, refresh, Review } = require('../modules');
const router = express.Router();


router.post('/api/review', async (req, res) => {
    try {
        const userID = returnUser(req.body.token);
        if (userID == null)
            return res.status(401).send('Token unverified or expired');
        const review =  new Review({
            restaurantID: req.body.restaurantID,
            userID: userID,
            rating: req.body.rating,
            comment: req.body.review,
            favorite: req.body.favorite
        });
        review.save();

        res.json({ token: refresh(req.body.token) });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }

});

router.get('/api/review/:restaurantID', async (req, res) => {
    try {
        const reviews = await Review.find({ restaurantID: req.params.restaurantID });
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;