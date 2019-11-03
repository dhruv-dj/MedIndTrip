var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new Schema({
    Name : {type: String , required:true},
    Hospital : {type: String , required:true},
    PhotoPath : {type: String , required:true},
    Specialization : {type: String , required:true},
    Experience : {type: String , required:true},
    Slots: {type : Object , required:true},
    Degree : {type: String , required:true},
    

});

var doctor = mongoose.model('doctorSchema',doctorSchema);
module.exports = doctor;