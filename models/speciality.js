var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var specialitySchema = new Schema({
    name: {type: String , required:true},
    subspeciality : {type: Array , required:true}
  
    

});

var speciality = mongoose.model('specialitySchema',specialitySchema);
module.exports = speciality;