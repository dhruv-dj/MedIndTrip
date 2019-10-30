var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session')

var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb://mohankukreja1:novice123@ds125945.mlab.com:25945/novice_database',{ useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to DB successfully!');
      }
});
var app = express();


    
var index = require('./routes/index');
var userRoute = require('./routes/user');



// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({secret: 'mysuoersecret' , resave: false, saveUninitialized: false, store: new MongoStore({mongooseConnection : mongoose.connection}), cookie : {maxAge : 180 * 60 * 1000}}));




    
app.use('/', index);
app.use('/user',userRoute);





app.listen(3000,function(req,res){
  console.log("server started");
})
