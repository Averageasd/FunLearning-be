const mongoose = require('mongoose');
exports.validateObjectId = function validateObjectId(id) {
    return mongoose.isValidObjectId(id);
}