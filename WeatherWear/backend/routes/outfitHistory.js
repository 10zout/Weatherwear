const express = require('express');
const OutfitHistory = require('../models/OutfitHistory');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    const { weather, temperature, recommendation } = req.body;

    try {
        const newOutfitHistory = new OutfitHistory({
            user_id: req.user.id,
            weather,
            temperature,
            recommendation
        });

        const outfitHistory = await newOutfitHistory.save();
        res.json(outfitHistory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const outfitHistory = await OutfitHistory.find({ user_id: req.user.id });
        res.json(outfitHistory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
