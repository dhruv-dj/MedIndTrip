var express = require('express');
var path = require('path');
var router = express.Router();
var hospital = require('../models/hospital');
var doctor = require('../models/doctor');

var csrf = require('csurf');
var Cart = require('../models/hospital');

router.post('/seed',function(req,res){
  //console.log(req);
  var newUser=new doctor();

  newUser.Name  = req.body.Name;
  newUser.Hospital = req.body.Hospital;
  
  newUser.PhotoPath= '/frontend/images/architecture-daylight-door-239853.jpg';
  newUser.Specialization = req.body.Specialization;
  newUser.Experience = req.body.Experience;
  newUser.Degree = req.body.Degree;
  

  newUser.save(function (err) {
      if(err) throw (err);

      return res.redirect('/');
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
  doctor.find(function(err,doctors){
    res.json(doctors);
  })
})
router.get('/getHospitals',function(req,res){
  hospital.find(function(err,hospitals){
    res.json(hospitals);
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
