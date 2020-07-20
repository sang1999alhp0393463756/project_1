var mongoose = require('../config/dbConnect');
var Schema = mongoose.Schema;
var acountSchema = new Schema({
    username : String,
    password : String,
    phone : Number
});
var acountModel = mongoose.model('acountSang',acountSchema);
module.exports = acountModel;