const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema(
    {
        name: {type: String, required: true, minLength: 5},
        count: {type: Number},
        cards: [{type: [Schema.Types.ObjectId], ref:"card"}],
    }
);

module.exports = mongoose.model('deck', DeckSchema);