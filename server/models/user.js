var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    googleUser_id: String,
    score: Number
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;