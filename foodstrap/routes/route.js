var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const fetch = require("node-fetch");
const fs = require('fs');
var constants = require('../public/settings/Constants');

/* SHOW landing PAGE */
router.get('/', function (req, res, next) {
  res.render('index'); 
});
/* show signin page */
router.get('/signin', function (req, res, next) {
  res.render('signin');
});
/* show signup page */
router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.get('/setting', function (req, res, next) {
 // console.log(req.session);
 // var prop = require('../public/settings/properties');
 //var lang= prop.lang;
 var lang = constants.properties.lang;
 console.log("----lang: "+lang);
  res.render('setting',
    {
      langCode: lang
    }
  );
});
router.post('/setting', function (req, res, next) {
  //res.render('setting'); 
  //   var properties = require('../public/settings/properties');  
  var lang = req.body.lang;
  //sessionStorage.setItem("lang",lang);
  //   console.log("lang updated: "+lang); 
  // console.log("props: "+properties.lang);
  //properties.lang = lang;
  
  //setting value in json file
 /* jsonReader('../foodstrap/public/settings/properties.json', (err, prop) => {
    if (err) {
      console.log('Error reading file:', err)
      return
    }
    prop.lang = lang;
    fs.writeFile('../foodstrap/public/settings/properties.json', JSON.stringify(prop), (err) => {
      if (err) console.log('Error updating language:', err)
    })
  })*/
  constants.properties.lang = lang;
  res.redirect("/");
});

router.get('/restaurant_dashboard', function (req, res, next) {
  console.log("get restaurant_dashboard");
  res.render('restaurant_dashboard');
});
router.get('/volunteer_dashboard', function (req, res, next) {
  console.log("get volunteer_dashboard");
  res.render('volunteer_dashboard');
});

router.get('/shelter_dashboard', function (req, res, next) {
  console.log("get shelter_dashboard");
  res.render('shelter_dashboard');
});

router.post('/signup', function (req, res, next) {
  console.log(req.body);
  var user = {};
  var rest = {};
  var shelter = {};
  var vol = {};
  user.usertype = req.body.usertype;
  user.username = req.body.username;
  user.password = req.body.pass;
  if (user.usertype == "restaurant") {
    rest.username = req.body.username;
    rest.name = req.body.rname;
    rest.cuisine = req.body.rcuisine;
    rest.phone = req.body.rphone;
    rest.emailid = req.body.remailid;
    rest.addr = req.body.raddr;
    rest.city = req.body.rcity;
    rest.state = req.body.rstate;
    rest.zip = req.body.rzip;
  }
  if (user.usertype == "shelter") {
    shelter.username = req.body.username;
    shelter.name = req.body.sname;
    shelter.phone = req.body.sphone;
    shelter.emailid = req.body.semailid;
    shelter.addr = req.body.saddr;
    shelter.city = req.body.scity;
    shelter.state = req.body.sstate;
    shelter.zip = req.body.szip;
  }
  if (user.usertype == "volunteer") {
    vol.username = req.body.username;
    vol.name = req.body.name;
    vol.phone = req.body.phone;
    vol.emailid = req.body.emailid;
  }
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("users").insertOne(user, function (err, result) {
      if (err) throw err;
      // res.send("Successfully inserted");
      //res.render('signin');      
      // res.redirect("/signin");
    });
    if (user.usertype == "restaurant") {
      dbo.collection("restaurants").insertOne(rest, function (err, result) {
        if (err) throw err;
        // res.send("Successfully inserted");
        //res.render('signin');      
        res.redirect("/signin");
      });
    }
    if (user.usertype == "shelter") {
      dbo.collection("shelters").insertOne(shelter, function (err, result) {
        if (err) throw err;
        // res.send("Successfully inserted");
        //res.render('signin');      
        res.redirect("/signin");
      });
    }
    if (user.usertype == "volunteer") {
      dbo.collection("volunteers").insertOne(vol, function (err, result) {
        if (err) throw err;
        // res.send("Successfully inserted");
        //res.render('signin');      
        res.redirect("/signin");
      });
    }
  });
  // res.render('signup');
});
router.post('/signin', function (req, res, next) {
  //return "hello";
  console.log("sign in post");
  var user = {};
  usertype = req.body.usertype;
  username = req.body.username;
  password = req.body.pass;
  console.log("user data: " + usertype + username + password);
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("users").find({}).toArray(function (err, result) {
      if (err) throw err;
      let notfound = true;
      for (var i = 0; i < result.length; i++) {
        console.log("record:" + JSON.stringify(result[i]));
        if (username == result[i].username && password == result[i].password && usertype == result[i].usertype) {
          // user.name = result[i].name;
          user.username = result[i].username;
          user.type = result[i].usertype;
          console.log(user);
          req.session.user = user;
          notfound = false;
          console.log("----success");
          if (usertype == 'restaurant')
            res.redirect("/restaurant_dashboard");
          if (usertype == 'shelter')
            res.redirect("/shelter_dashboard");
          if (usertype == 'volunteer')
            res.redirect("/volunteer_dashboard");
          //return res.send("success");                  
        }
      }
      if (notfound) {
        console.log("failure to find match");
        res.redirect("/error");
      }

    });
  });
});

router.get('/login', function (req, res, next) {
  //return "hello";
  // console.log(req.body);
  var user = {};
  var usertype = req.query.usertype;
  var username = req.query.username;
  var password = req.query.password;
  console.log("user data: " + usertype + username + password);
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("users").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        console.log("record:" + JSON.stringify(result[i]));
        if (username == result[i].username && password == result[i].password && usertype == result[i].usertype) {
          user.name = result[i].name;
          user.username = result[i].username;
          user.type = result[i].usertype;
          console.log(user);
          req.session.user = user;
          console.log("suvvess");
          return res.send("success");
        }
      }
      console.log("failure to find match");
      return res.send("username or password is incorrect, please try again!");
    });
  });
});
//problem page
router.get('/problem', function (req, res, next) {
  res.render('problem');
});

//donote food page
router.get('/donors', function (req, res, next) {
  var rest = [];
MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("restaurants").find({}).toArray(function (err, result) {
      if (err) {console.log(err);}
      //console.log("---restaurants: "+result);
      for (var i = 0; i < result.length; i++) {	  
			rest.push({
			"name":result[i].name,
      "addr":result[i].city+', '+result[i].state,
      "contact":'Ph: '+result[i].phone+', Email: '+result[i].emailid
      });  
     // console.log("---"+i+' '+result[i].name);
      //rest.push(result[i].name);                                         
      }      
      console.log("restaurants: "+rest);
      res.render('donors',{
        restList:rest
      });    
    });
  }); 
});

//shelters page
router.get('/shelters', function (req, res, next) {
  res.render('shelters');
});

router.get('/volunteers', function (req, res, next) {
  res.render('volunteers');
});
function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err)
    }
    try {
      const object = JSON.parse(fileData)
      return cb && cb(null, object)
    } catch (err) {
      return cb && cb(err)
    }
  })
}
module.exports = router;