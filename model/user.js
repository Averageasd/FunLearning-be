const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String, required: true, minLength: 5},
        password: {type: String, required: true, minLength: 8},
        cards: [{type: Schema.Types.ObjectId, ref: "card"}],
        decks: [{type: Schema.Types.ObjectId, ref: "deck"}]
    }
);

module.exports = mongoose.model('user', UserSchema);