var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

console.log("Setting up light schema");

var LightSchema   = new Schema({
    room: String,
    status: String,
    on_code: String,
    off_code: String
});

module.exports = mongoose.model('Light', LightSchema);