var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    Name : {type: String , required:true},
    Hospital : {type: String , required:true},
    Age : {type: String , required:true},
    Date : {type: String , required:true},
    Doctor : {type: String , required:true},
    Email: {type : Object , required:true},
    Gender : {type: String , required:true},
    Hospital : {type: String , required:true},
    Mobile : {type: String , required:true},
    Slot : {type: String , required:true},
    Specialization: {type: String , required:true}
    
    

});

var booking = mongoose.model('bookingSchema',bookingSchema);
module.exports = booking;