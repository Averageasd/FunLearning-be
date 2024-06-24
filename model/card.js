const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
    {
        name: {type: String, required: true, minLength: 5},
        front: {type: String, required: true},
        deck: {type: Schema.Types.ObjectId, ref: 'deck'},
        back: {type: String, required: true}
    }
);

module.exports = mongoose.model('card', CardSchema);