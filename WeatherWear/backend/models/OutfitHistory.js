const mongoose = require('mongoose');

const OutfitHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    weather: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('OutfitHistory', OutfitHistorySchema);
