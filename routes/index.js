var express = require('express');
var path = require('path');
var router = express.Router();
var hospital = require('../models/hospital');
var doctor = require('../models/doctor');
var speciality = require('../models/speciality');
var booking = require('../models/booking');
var csrf = require('csurf');
var pdf = require("pdf-creator-node");
var fs = require('fs');
var Cart = require('../models/hospital');
var html = fs.readFileSync('template.html', 'utf8');

router.get('/seed',function(req,res){
  //console.log(req);
  var newUser=new speciality();

  newUser.name  = "Bariatric Surgery";
  newUser.subspeciality = ["Gastric Bypass Surgery",
    "Gastric Sleeve Surgery",
    "Gastric Band Surgery",
    "Gastric Balloon Treatment",
    "Weight Loss Surgery"]
  
  
 
  

  newUser.save(function (err) {
      if(err) throw (err);

      return res.redirect('/');
  })
  })

router.get('/getspeciality',function(req,res){
  speciality.find(function(err,result){
    res.json(result)
    
  })
})

router.get('/getbooking',function(req,res){
  booking.find().limit(50).exec(function(er,data){
    res.json(data);
  })
})


router.use('/',express.static(path.join(__dirname , '../frontend')));
/* GET home page. */
// router.get('/', function(req, res, next) {

//   var items = product.find(function(err,result){
//     //console.log(result);
//     var arr = [];
//     for(var i=0;i<result.length;i++){
//       var obj = {};
//       obj._id = result[i]._doc._id.toString();
//       obj.title = result[i]._doc.title;
//       obj.price = result[i]._doc.price;
//       obj.imagePath = result[i]._doc.imagePath;
//       obj.description = result[i]._doc.description;
//     //  console.log(obj);
//       arr.push(obj);
//     }
//     var finalarr = [];
//     for(var i=0 ;i<arr.length;i+=3 ){
//       finalarr.push(arr.slice(i,i+3));
//     }
//     //console.log(finalarr);
//     res.render('shop/index', { title: 'Express', product : finalarr });
//   });
//   //console.log(items);
// });

router.post('/add_details',function(req,res,next){
  console.log(req);
  var obj = {};
  obj.email = req.body.email;
  obj.phone = req.body.phone;
  req.session.info = obj;
  return res.json({hello : "123"});
  //res.redirect('/booking.html#step2');
  // var productId = req.params.id;
  // var cart = new Cart(req.session.cart ? req.session.cart : {items : {}, totalQty : 0, totalPrice : 0});
  // product.findById(productId,function(err,item){
  //   if(err) throw err;
  //   cart.add(item,item.id);
  //   req.session.cart = cart;
  //   //console.log(req.session.cart);
  //   res.redirect('/');
  // })
})


router.get('/getDoctors',function(req,res){
  // hospital.find(function(err,hospitals){
  //   console.log(hospitals);
  //   var arr = [];
  //   for(var i=0;i<hospitals.length;i++){
  //     var obj = {};
  //     obj.id = hospitals[i].id;
  //     obj.name = hospitals[i].Name;
  //     arr.push(obj);
  //   }
  //   console.log(arr);
    doctor.find(function(err,doctors){
      res.json(doctors)
      

      
      
      // for(var i=0;i<doctors.length;i++){
      //   for(var j=0;j<arr.length;j++){
      //     if(doctors[i]._doc.Hospital == arr[j].name){
      //       doctors[i]._doc.Hospital = arr[j];
      //       break;
      //     }
      //   }
      // }
      
      
    })
  // })
  
})
router.get('/getHospitals',function(req,res){
  hospital.find(function(err,hospitals){
    res.json(hospitals);
  })
})

router.post('/addHospital',function(req,res){
  var newUser=new hospital();

  newUser.Name  =  req.body.hname;
  newUser.Address = req.body.address;
  newUser.Contact = req.body.contact;
  
  
 
  

  newUser.save(function (err) {
      if(err) throw (err);

      return res.redirect('/admin.html');
  })
})

router.post('/addDoctor',function(req,res){
  console.log(req);
  var newUser=new doctor();
  var checkSlots = {
    "8-9": ["8.00","8.15","8.30","8.45"],
    "9-10": ["9.00","9.15","9.30","9.45"],
    "10-11": ["10.00","10.15","10.30","10.45"],
    "11-12": ["11.00","11.15","11.30","11.45"],
    "12-13": ["12.00","12.15","12.30","12.45"],
    "13-14": ["13.00","13.15","13.30","13.45"],
    "14-15": ["14.00","14.15","14.30","14.45"],
    "15-16": ["15.00","15.15","15.30","15.45"],
    "16-17": ["16.00","16.15","16.30","16.45"],
    "17-18": ["17.00","17.15","17.30","17.45"],
    "18-19": ["18.00","18.15","18.30","18.45"],
    "19-20": ["19.00","19.15","19.30","19.45"]

  }
  finalSlot= [];
  var tempArr = req.body.slot;
  for(var i=0;i<tempArr.length;i++){
    var adding = checkSlots[tempArr[i]];
    finalSlot.push(adding);
    
  }
  var arr = [];
  for(var i=0;i<finalSlot.length;i++){
    for(var j=0;j<finalSlot[i].length;j++){
      arr.push(finalSlot[i][j]);
    }
  }
  console.log(req);
  
  
  hospital.findById(req.body.hospital, function (err, hosp) {
    console.log(hosp);
    var obj = {};
    obj.id = hosp.id;
    obj.Name = hosp.Name;
    newUser.Name  =  req.body.dname;
    newUser.Hospital = obj;
    newUser.Degree = req.body.degree;
    newUser.Slots = arr;
    newUser.Specialization = req.body.specialization;
    console.log(newUser)

      newUser.save(function (err) {
          if(err) throw (err);

          return res.redirect('/admin.html');
      })
   
  } );
  
})
 
 

  
 

  



router.post("/confirmBooking", function(req,res){
  console.log(req);
  //console.log(req);
  hospital.findById(req.body.hospital, function (err, hosp) {
    console.log(hosp);
    doctor.findById(req.body.doctor, function (err, doc) {
      console.log(doc);
      var newUser=new booking();

      newUser.Name  = req.body.name;
      newUser.Hospital = hosp.Name;
      newUser.Age = req.body.age;
      newUser.Date = req.body.date;
      newUser.Doctor = doc.Name;
      newUser.Email = req.body.email;
      newUser.Gender = req.body.gender;
      newUser.Mobile = req.body.mobile;
      newUser.Slot = req.body.slot;
      newUser.Specialization = req.body.specialization;
      newUser.Sub_specialization = req.body.specialization;

      newUser.save(function (err) {
          if(err) throw (err);
          console.log("hello");
          var newUser2=new booking();

  newUser2.Name  = req.body.name;
  newUser2.Hospital = req.body.hospital;
  newUser2.Age = req.body.age;
  newUser2.Date = req.body.date;
  newUser2.Doctor = req.body.doctor;
  newUser2.Email = req.body.email;
  newUser2.Gender = req.body.gender;
  newUser2.Mobile = req.body.mobile;
  newUser2.Slot = req.body.slot;
  newUser2.Specialization = req.body.specialization;
  newUser2.Sub_specialization = req.body.specialization;
  
  
  
  
    
  newUser2.save(function (err) {
      if(err) throw (err);
      console.log("blablblblb")
      res.send("Confirmmm")
//      res.redirect('/');

  })

      })
      
    })
  })

  
})

router.get("/shopping-cart",function(req,res,next){
  if(!req.session.cart){
    res.render('shop/shopping_cart',{product : null});
  }
  var cart = new Cart(req.session.cart);
  var arr = cart.generateArray();
  console.log(arr);
  //console.log(cart);
  res.render('shop/shopping_cart',{product : cart.generateArray() , total : cart.totalPrice});

})


module.exports = router;
