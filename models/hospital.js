var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospitalSchema = new Schema({
    Name : {type: String , required:true},
    Address : {type: String , required:true},
    Contact : {type: String , required:true},
    

});

var hospital = mongoose.model('hospitalSchema',hospitalSchema);
module.exports = hospital;