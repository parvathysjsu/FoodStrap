var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const fetch = require("node-fetch");
const fs = require('fs');
var constants = require('../public/settings/Constants');
var messages = require('../public/settings/localization');
const NodeGeocoder = require('node-geocoder');
const _ = require("lodash");

/* SHOW landing PAGE */
router.get('/', function (req, res, next) {
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.index[lang];
  //res.render('index');
  //console.log(msgsVar);
  var count = 0;
  console.log("------start");
  var options = {
    provider: 'openstreetmap'
  };
  let requests = [];
  var geoCoder = NodeGeocoder(options);
  console.log("------middle");
  /*geoCoder.geocode('95112 United States of America')
    .then((res)=> {
      console.log(res);
    })
    .catch((err)=> {
      console.log(err);
    });*/

  console.log("------end");
  let restList = [];
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("donations").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        count = count + parseInt(result[i].count);
      }
      // console.log("don: "+don);
      console.log("c: " + count);

    });
    let rest = [];
    dbo.collection("restaurants").find({}).toArray(function (err, result) {
      if (err) { console.log(err); }
      //console.log("---restaurants: "+result);
      for (var i = 0; i < result.length; i++) {
        console.log("------position:"+JSON.stringify(result[i].location));
        rest.push({
          "name": result[i].name,
          "addr": result[i].city + ', ' + result[i].state,
          "contact": 'Ph: ' + result[i].phone + ', Email: ' + result[i].emailid,
          "zip": result[i].zip,
          "position":result[i].location
        });
        // if (result[i].zip != "") {
        //   var addrQ = result[i].zip + ' United States of America';
        //   // var addrQ = result[i].zip;
        //   requests.push(geoCoder.geocode(addrQ));
        // }
      }

      console.log("restaurants: " + JSON.stringify(rest));
      //Promise.all(requests).then((result) => {
        console.log("--------success==");
        //console.log(result);
        // result.forEach(resultsForOne => {
        //   let answer = _.head(resultsForOne);
        //   let oneRecord = {};
        //   oneRecord.position = {};
        //   oneRecord.position.lat = answer.latitude;
        //   oneRecord.position.lng = answer.longitude;
        //   oneRecord.zip = answer.zipcode;
        //   let restRec = rest.find(element => element.zip == answer.zipcode);
        //   oneRecord.name = restRec.name;
        //   const index = rest.indexOf(restRec);
        //   if (index > -1) {
        //     rest.splice(index, 1);
        //   }
        //   restList.push(oneRecord);
        // });
       // console.log(rest);
        var user = {};
        user.restList = rest;
        req.session.user = user;
        res.render('index', {
          msgs: msgsVar,
          navLabels: messages.page.nav[lang],
          donCount: count,
          restAll: rest,
          imgNames: messages.page.images[lang]
        });
      // }).catch((result) => {
      //   console.log("-----error-----")
      //   console.log(result);
      // });
    });


  });

});

router.get('/restList', function (req, res, next) {
  var restList = req.session.user.restList;
  res.send({
    restList
  });
});

router.get('/donPosition', function (req, res, next) {
  var donPosition = req.session.user.donPosition;
  res.send(
    donPosition
  );
});
router.get('/shelterPosition', function (req, res, next) {
  var shelterPosition = req.session.user.shelterPosition;
  res.send(
    shelterPosition
  );
});
/* show signin page */
router.get('/signin', function (req, res, next) {
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.signin[lang];
  res.render('signin', {
    msgs: msgsVar,
    navLabels: messages.page.nav[lang],
    imgNames: messages.page.images[lang]
  });
});
/* show signup page */
router.get('/signup', function (req, res, next) {
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.signup[lang];
  res.render('signup', {
    msgs: msgsVar,
    navLabels: messages.page.nav[lang],
    msgsUserType: messages.page.signin[lang],
    imgNames: messages.page.images[lang]
  });
});
router.get('/setting', function (req, res, next) {
  // console.log(req.session);
  // var prop = require('../public/settings/properties');
  //var lang= prop.lang;

  var lang = constants.properties.lang;
  console.log("----lang: " + lang);
  var msgsVar = messages.page.settings[lang];
  res.render('setting',
    {
      langCode: lang,
      msgs: msgsVar,
      navLabels: messages.page.nav[lang],
      imgNames: messages.page.images[lang]
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

router.get('/donate', function (req, res, next) {
  console.log("get donate");
  var lang = constants.properties.lang;
  console.log(lang);
  console.log(req.session.user);
  var msgsVar = messages.page.donate[lang];
  //var msgsVar = "hello";
  //console.log(msgsVar);
  res.render('donate', {
    msgs: msgsVar,
    user: req.session.user,
    langCode: lang
  }
  );
});
router.get('/donationshistory', function (req, res, next) {
  console.log("get donationshistory");
  var lang = constants.properties.lang;
  console.log(lang);
  console.log(req.session.user);
  var msgsVar = messages.page.donationshistory[lang];
  //var msgsVar = "hello";
  //console.log(msgsVar);
  var don = [];
  var count = 0;
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("donations").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        // console.log("count: "+count);
        //console.log("record:" + JSON.stringify(result[i]));
        // console.log(req.session.user.username+ ' '+result[i].restaurant);
        if (req.session.user.username == result[i].restaurant) {
          // console.log(" ------match--"+req.session.user.username);
          // console.log(count);
          // console.log(result[i].count);
          count = count + parseInt(result[i].count);
          don.push({
            "menu": result[i].menu,
            "cuisine": result[i].cuisine,
            "count": result[i].count,
            "pickuptime": result[i].pickuptime,
            "addr": result[i].pickupaddr + ', ' + result[i].pickupaddrcity + ', ' + result[i].pickupaddrstate + ' ' + result[i].pickupaddrzip,
            "allergy": result[i].allergy,
            "notes": result[i].notes,
            "shelter": result[i].shelter.name,
            "status": result[i].status,
            "volunteer": result[i].volunteer.name
          });
        }
      }
      // console.log("don: "+don);
      console.log("c: " + count);
      res.render('donationshistory', {
        msgs: msgsVar,
        user: req.session.user,
        langCode: lang,
        donList: don,
        donCount: count
      }
      );
    });

  });

});
router.get('/restaurant_dashboard', function (req, res, next) {
  console.log("get restaurant_dashboard");
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.restaurant_dashboard[lang];
  var don = [];
  var count = 0;
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("donations").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        // console.log("count: "+count);
        //console.log("record:" + JSON.stringify(result[i]));
        // console.log(req.session.user.username+ ' '+result[i].restaurant);
        if (req.session.user.username == result[i].restaurant) {
          // console.log(" ------match--"+req.session.user.username);
          // console.log(count);
          // console.log(result[i].count);
          count = count + parseInt(result[i].count);
          don.push({
            "menu": result[i].menu,
            "cuisine": result[i].cuisine,
            "count": result[i].count,
            "pickuptime": result[i].pickuptime,
            "addr": result[i].pickupaddr + ', ' + result[i].pickupaddrcity + ', ' + result[i].pickupaddrstate + ' ' + result[i].pickupaddrzip,
            "allergy": result[i].allergy,
            "notes": result[i].notes
          });
        }
      }
      // console.log("don: "+don);
      console.log("c: " + count);
      res.render('restaurant_dashboard', {
        msgs: msgsVar,
        user: req.session.user,
        langCode: lang,
        donList: don,
        donCount: count
      }
      );
    });

  });
});

router.get('/donationprocess', function (req, res, next) {
  console.log("get donationprocess");
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.donationprocess[lang];
  res.render('donationprocess', {
    msgs: msgsVar,
    user: req.session.user,
    langCode: lang
  }
  );
});

router.get('/pickup/:donid', function (req, res, next) {
  console.log("get pickup");
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.vol_dashboard[lang];
  let donid = req.params.donid;
  console.log("--pick up --" + donid);
  console.log("-- vol--" + req.session.user.name + "--" + req.session.user.username);
  let don = {};
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");

    dbo.collection("donations").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (donid == result[i]._id) {
          don = {
            "restaurant": result[i].restaurant,
            "menu": result[i].menu,
            "cuisine": result[i].cuisine,
            "count": result[i].count,
            "pickuptime": result[i].pickuptime,
            "zip": result[i].pickupaddrzip,
            "addr": result[i].pickupaddr + ', ' + result[i].pickupaddrcity + ', ' + result[i].pickupaddrstate + ' ' + result[i].pickupaddrzip,
            "allergy": result[i].allergy,
            "notes": result[i].notes,
            "shelter": result[i].shelter.name,
            "status": result[i].status,
            "id": result[i]._id
          };
          console.log("------id" + result[i]._id);
        }
      }
      var geoCoder = NodeGeocoder({
        provider: 'openstreetmap'
      });
      console.log("---addr searched: " + don.zip + ' United States of America');
      geoCoder.geocode(don.zip + ' United States of America')
        .then((mapres) => {
          console.log(mapres);
          let position = {};
          if (mapres.length != 0) {
            let answer = _.head(mapres);
            position.lat = answer.latitude;
            position.lng = answer.longitude;
            console.log("--------pos" + JSON.stringify(position));
          }
          req.session.user.donPosition = position;
          res.render('pickup', {
            msgs: msgsVar,
            msgsForm: messages.page.donate[lang],
            msgsForm2: messages.page.donationshistory[lang],
            user: req.session.user,
            langCode: lang,
            don: don
          }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
})
router.get('/claim/:donid', function (req, res, next) {
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.shelter_dashboard[lang];
  let donid = req.params.donid;
  console.log("--pick up --" + donid);
  console.log("-- shelter--" + req.session.user.name + "--" + req.session.user.username);
  let don = {};
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("shelters").find({}).toArray(function (err, resultshelter) {
      if (err) throw err;
      for (var i = 0; i < resultshelter.length; i++) {
        if (req.session.user.username == resultshelter[i].username) {
          req.session.user.name = resultshelter[i].name;
          req.session.user.shid = resultshelter[i].username;
          shName = resultshelter[i].username;
        }
      }
    dbo.collection("donations").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (donid == result[i]._id) {
          don = {
            "restaurant": result[i].restaurant,
            "menu": result[i].menu,
            "cuisine": result[i].cuisine,
            "count": result[i].count,
            "pickuptime": result[i].pickuptime,
            "zip": result[i].pickupaddrzip,
            "addr": result[i].pickupaddr + ', ' + result[i].pickupaddrcity + ', ' + result[i].pickupaddrstate + ' ' + result[i].pickupaddrzip,
            "allergy": result[i].allergy,
            "notes": result[i].notes,
            "shelter": result[i].shelter.name,
            "status": result[i].status,
            "id": result[i]._id
          };
          console.log("------id" + result[i]._id);
        }
      }
      var geoCoder = NodeGeocoder({
        provider: 'openstreetmap'
      });
      console.log("---addr searched: " + don.zip + ' United States of America');
      geoCoder.geocode(don.zip + ' United States of America')
        .then((mapres) => {
          console.log(mapres);
          let position = {};
          if (mapres.length != 0) {
            let answer = _.head(mapres);
            position.lat = answer.latitude;
            position.lng = answer.longitude;
            console.log("--------pos" + JSON.stringify(position));
          }
          req.session.user.donPosition = position;
          res.render('claim', {
            msgs: msgsVar,
            msgsForm: messages.page.donate[lang],
            msgsForm2: messages.page.donationshistory[lang],
            user: req.session.user,
            langCode: lang,
            don: don
          }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
})
router.get('/volunteer_dashboard', function (req, res, next) {
  console.log("get volunteer_dashboard");
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.vol_dashboard[lang];
  var msgsTable = messages.page.donationshistory[lang];
  let shName = "";
  let don = [];
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("volunteers").find({}).toArray(function (err, result2) {
      if (err) throw err;
      for (var i = 0; i < result2.length; i++) {
        if (req.session.user.username == result2[i].username) {
          req.session.user.name = result2[i].name;
          req.session.user.shid = result2[i].shelter.username;
          shName = result2[i].shelter.username;
        }
      }
      dbo.collection("donations").find({}).toArray(function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          if (shName == result[i].shelter.username && "CLAIMED" == result[i].status) {
            don.push({
              "menu": result[i].menu,
              "cuisine": result[i].cuisine,
              "count": result[i].count,
              "pickuptime": result[i].pickuptime,
              "addr": result[i].pickupaddr + ', ' + result[i].pickupaddrcity + ', ' + result[i].pickupaddrstate + ' ' + result[i].pickupaddrzip,
              "allergy": result[i].allergy,
              "notes": result[i].notes,
              "shelter": result[i].shelter.name,
              "status": result[i].status,
              "id": result[i]._id,
              //"link":"/pickupdonation/"+result[i]._id
              "link": "/pickup/" + result[i]._id
            });
            console.log("------id" + result[i]._id);
          }
        }
        // console.log("don: "+don);
        //console.log("c: " + count);
        res.render('volunteer_dashboard', {
          msgs: msgsVar,
          msgsTable: msgsTable,
          user: req.session.user,
          langCode: lang,
          donList: don
        }
        );
      });
    });
  });
});
//router.get('/pickupdonation/:donid', function (req, res, next) {
router.post('/pickupdonation', function (req, res, next) {
  console.log("---------------pickupdonation--------------")
  let donid = req.body.id;
  console.log("--donid  --" + donid);
  console.log("--pick up --" + donid);
  console.log("-- vol--" + req.session.user.name + "--" + req.session.user.username);
  let don = {};
  don.status = "DONE";
  don.volunteer = {
    "username": req.session.user.username,
    "name": req.session.user.name
  };
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    var myquery = { _id: new ObjectId(donid) };
    var newvalues = { $set: don };
    dbo.collection("donations").updateOne(myquery, newvalues, function (err, resp) {
      if (err) throw err;
      console.log("1 document updated");
      res.redirect("/volunteer_dashboard");
    });
  });
});

router.post('/claimdonation', function (req, res, next) {

  let donid = req.body.id;

  console.log("-- shelter--" + req.session.user.name + "--" + req.session.user.username);
  let don = {};
  don.status = "CLAIMED";

  don.shelter = {
    "username": req.session.user.username,
    "name": req.session.user.name
  };
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    var myquery = { _id: new ObjectId(donid) };
    var newvalues = { $set: don };
    dbo.collection("donations").updateOne(myquery, newvalues, function (err, resp) {
      if (err) throw err;
      console.log("1 document updated");
      res.redirect("/shelter_dashboard");
    });
  });
});
router.get('/shelter_dashboard', function (req, res, next) {
  console.log("get shelter_dashboard");
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.shelter_dashboard[lang];

  let shelter = {};
  let volunteer = [];
  var username = req.session.user.username;
  console.log("uname" + username)
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");

    dbo.collection("shelters").find().toArray(function (err, result2) {
      if (err) throw err;
      for (var i = 0; i < result2.length; i++) {
        console.log("inside shelter");
         if(req.session.user.username == result2[i].username){
          shelter = {
             "addr":result2[i].addr,
             "city":result2[i].city,
             "state":result2[i].state,
            "zip":result2[i].zip
          };
      }
    }
      var query2 = {"shelter.username": username}
    dbo.collection("volunteers").find(query2).toArray(function (err, result) {
      if (err) throw err;

      for (var i = 0; i < result.length; i++) {
        console.log("inside volunteer");
          volunteer.push({
            "name":result[i].name
          });
      }
      let don = [];
      dbo.collection("donations").find({}).toArray(function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          // console.log("count: "+count);
          //console.log("record:" + JSON.stringify(result[i]));
          // console.log(req.session.user.username+ ' '+result[i].restaurant);
          if (req.session.user.username == result[i].shelter.username) {
            // console.log(" ------match--"+req.session.user.username);
            // console.log(count);
            // console.log(result[i].count);
            don.push({
              "restaurant":result[i].restaurant
            });
          }
        }

      var geoCoder = NodeGeocoder({
        provider: 'openstreetmap'
      });
      console.log("---addr searched: " + shelter.zip + ' United States of America');
      geoCoder.geocode(shelter.zip + ' United States of America')
        .then((mapres) => {
          console.log(mapres);
          let position = {};
          if (mapres.length != 0) {
            let answer = _.head(mapres);
            position.lat = answer.latitude;
            position.lng = answer.longitude;
            console.log("--------pos" + JSON.stringify(position));
          }
          req.session.user.shelterPosition = position;
          res.render('shelter_dashboard', {
            msgs: msgsVar,
            user: req.session.user,
            langCode: lang,
            shelter: shelter,
            donList:don,
            Volunteers:volunteer
          }
          );
        })
        .catch((err) => {
          console.log(err);
        });
      });
    });
  });
  });
})
router.post('/donate', function (req, res, next) {
  console.log(req.body);
  var donation = {};
  donation.restaurant = req.session.user.username;
  donation.menu = req.body.menu;
  donation.cuisine = req.body.cuisine;
  donation.count = req.body.count;
  donation.allergy = req.body.allergy;
  donation.notes = req.body.notes;
  donation.pickuptime = req.body.pickuptime;
  donation.pickupaddr = req.body.addr;
  donation.pickupaddrcity = req.body.city;
  donation.pickupaddrstate = req.body.state;
  donation.pickupaddrzip = req.body.zip;
  donation.status = "OPEN";
  donation.shelter = {
    "username": "",
    "name": ""
  };
  donation.volunteer = {
    "username": "",
    "name": ""
  };
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("donations").insertOne(donation, function (err, result) {
      if (err) throw err;
      res.redirect("/restaurant_dashboard");
    });
  });
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
    vol.shelter = {
      "username": "",
      "name": ""
    };
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
      var geoCoder = NodeGeocoder({
        provider: 'openstreetmap'
      });
      console.log("---addr searched: " + rest.zip + ' United States of America');
      geoCoder.geocode(rest.zip + ' United States of America')
        .then((mapres) => {
          console.log(mapres);
          let position = {};
          if (mapres.length != 0) {
            let answer = _.head(mapres);
            position.lat = answer.latitude;
            position.lng = answer.longitude;
          }
          console.log("------pos:"+JSON.stringify(position));
          return position;
        })
        .then((pos) => {
          rest.location = pos;
          console.log("------rest:"+JSON.stringify(rest));
          dbo.collection("restaurants").insertOne(rest, function (err, result) {
            if (err) throw err;
            // res.send("Successfully inserted");
            //res.render('signin');
            res.redirect("/signin");
          });
        }).catch((result) => {
          console.log("-----error-----")
          console.log(result);
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
  console.log("get problem");
  var lang = constants.properties.lang;
  var msgsVar = messages.page.problem[lang];
  console.log(msgsVar);
res.render('problem',{
  msgs:msgsVar,
  navLabels:messages.page.nav[lang],
  imgNames: messages.page.images[lang]
});
});

router.get('/shelter_claim',function (req, res, next){
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.shelter_dashboard[lang];
  var msgsTable = messages.page.donationshistory[lang];
  let shName = "";
  let don = [];
  var count =0;
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");

    dbo.collection("donations").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
       // console.log("count: "+count);
        //console.log("record:" + JSON.stringify(result[i]));
       // console.log(req.session.user.username+ ' '+result[i].restaurant);
       console.log("inside result");
        if ("OPEN"==result[i].status) {
         // console.log(" ------match--"+req.session.user.username);
         // console.log(count);
         // console.log(result[i].count
         console.log("inside status");
          count= count+ parseInt(result[i].count);
          don.push({
            "menu":result[i].menu,
            "cuisine":result[i].cuisine,
            "count":result[i].count,
            "pickuptime":result[i].pickuptime,
            "addr":result[i].pickupaddr+', '+result[i].pickupaddrcity+', '+result[i].pickupaddrstate+' '+result[i].pickupaddrzip,
            "allergy":result[i].allergy,
            "notes":result[i].notes,
            "status":result[i].status,
            "link": "/claim/" + result[i]._id
            });
        }
      }
     console.log("don: "+don);
      console.log("c: "+count);
      res.render('shelter_claim',{
        msgs: msgsVar,
        msgsTable: msgsTable,
        user: req.session.user,
        langCode: lang,
        donList: don
      }
      );
    });
  });

});
router.get('/past_claim',function (req, res, next){
  console.log("get claim history");
  var lang = constants.properties.lang;
  console.log(lang);
  console.log(req.session.user.username);
  var msgsVar = messages.page.donationshistory[lang];
  var msgs = messages.page.shelter_dashboard[lang];
  //var msgsVar = "hello";
  //console.log(msgsVar);
  var don = [];
  var count = 0;
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("donations").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        // console.log("count: "+count);
        //console.log("record:" + JSON.stringify(result[i]));
        // console.log(req.session.user.username+ ' '+result[i].restaurant);
        if (req.session.user.username == result[i].shelter.username) {
          // console.log(" ------match--"+req.session.user.username);
          // console.log(count);
          // console.log(result[i].count);
          don.push({
            "menu": result[i].menu,
            "cuisine": result[i].cuisine,
            "count": result[i].count,
            "pickuptime": result[i].pickuptime,
            "addr": result[i].pickupaddr + ', ' + result[i].pickupaddrcity + ', ' + result[i].pickupaddrstate + ' ' + result[i].pickupaddrzip,
            "allergy": result[i].allergy,
            "notes": result[i].notes,
            "shelter": result[i].shelter.name,
            "status": result[i].status,
            "volunteer": result[i].volunteer.name
          });
        }
        if(req.session.user.username == result[i].shelter.username && "DONE" == result[i].status){
          count = count + parseInt(result[i].count);
        }
      }
      // console.log("don: "+don);
      console.log("c: " + count);
      res.render('past_claim', {
        msgsValues:msgs,
        msgs: msgsVar,
        user: req.session.user,
        langCode: lang,
        donList: don,
        donCount: count
      }
      );
    });

  });

});
//donote food page
router.get('/donors', function (req, res, next) {
  var rest = [];
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.donors[lang];
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("restaurants").find({}).toArray(function (err, result) {
      if (err) { console.log(err); }
      //console.log("---restaurants: "+result);
      for (var i = 0; i < result.length; i++) {
        rest.push({
          "name": result[i].name,
          "addr": result[i].city + ', ' + result[i].state,
          "contact": 'Ph: ' + result[i].phone + ', Email: ' + result[i].emailid
        });
        // console.log("---"+i+' '+result[i].name);
        //rest.push(result[i].name);
      }
      console.log("restaurants: " + rest);
      res.render('donors', {
        restList: rest,
        msgs: msgsVar,
        navLabels: messages.page.nav[lang],
        imgNames: messages.page.images[lang]
      });
    });
  });
});

//shelters page
router.get('/shelters', function (req, res, next) {
  var lang = constants.properties.lang;
  console.log(lang);
  var msgsVar = messages.page.shelters[lang];
  res.render('shelters', {
    msgs: msgsVar,
    navLabels: messages.page.nav[lang],
    msgsQuote: messages.page.donors[lang],
    imgNames: messages.page.images[lang]
  });
});

router.get('/volunteers', function (req, res, next) {
  var lang = constants.properties.lang;
  var msgsVar = messages.page.volunteers[lang];
res.render('volunteers',{
  msgs:msgsVar,
  navLabels:messages.page.nav[lang],
  imgNames: messages.page.images[lang]
});
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
router.get('/vol_profile', function (req, res, next) {
  console.log("get vol_profile");
  var lang = constants.properties.lang;
  console.log(lang);
  console.log(req.session.user);
  var msgsVar = messages.page.vol_dashboard[lang];
  var msgsFormVar = messages.page.signup[lang];
  var msgsButton = messages.page.settings[lang];
  //var msgsVar = "hello";
  //console.log(msgsVar);
  var vol = {};
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("volunteers").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (req.session.user.username == result[i].username) {
          console.log(result[i].username);
          vol.name = result[i].name;
          console.log("vol.name" + vol.name);
          vol.phone = result[i].phone;
          vol.emailid = result[i].emailid;
          vol.shelter = result[i].shelter;
        }
      }
      var rname = vol.name.toUpperCase();
      console.log("vol: " + vol);
      let shelters = [];
      dbo.collection("shelters").find({}).toArray(function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          let sh = {};
          sh.name = result[i].name;
          sh.username = result[i].username;
          console.log("shelters: " + sh.username);
          shelters.push(sh);
        }
        console.log("shelters: " + shelters);
        res.render('vol_profile', {
          msgs: msgsVar,
          formFields: msgsFormVar,
          user: req.session.user,
          langCode: lang,
          profile: vol,
          name: rname,
          shelters: shelters,
          msgsButton: msgsButton
        }
        );
      });
    });
  });
});
router.get('/rest_profile', function (req, res, next) {
  console.log("get rest_profile");
  var lang = constants.properties.lang;
  console.log(lang);
  console.log(req.session.user);
  var msgsVar = messages.page.rest_profile[lang];
  var msgsFormVar = messages.page.signup[lang];
  //var msgsVar = "hello";
  //console.log(msgsVar);
  var restUser = {};
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("restaurants").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (req.session.user.username == result[i].username) {
          restUser.name = result[i].name;
          restUser.cuisine = result[i].cuisine;
          restUser.phone = result[i].phone;
          restUser.emailid = result[i].emailid;
          restUser.addr = result[i].addr;
          restUser.city = result[i].city;
          restUser.state = result[i].state;
          restUser.zip = result[i].zip;
        }
      }
      var rname = restUser.name.toUpperCase();
      console.log("restUser: " + restUser);
      res.render('rest_profile', {
        msgs: msgsVar,
        formFields: msgsFormVar,
        user: req.session.user,
        langCode: lang,
        profile: restUser,
        name: rname
      }
      );
    });
  });

});
router.post('/rest_profile', function (req, res, next) {
  console.log(req.body);
  var rest = {};
  var username = req.session.user.username;
  // rest.username = username;
  // rest.name = req.body.rname;
  rest.cuisine = req.body.rcuisine;
  rest.phone = req.body.rphone;
  rest.emailid = req.body.remailid;
  rest.addr = req.body.raddr;
  rest.city = req.body.rcity;
  rest.state = req.body.rstate;
  rest.zip = req.body.rzip;
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    var myquery = { username: username };
    var newvalues = { $set: rest };
    dbo.collection("restaurants").updateOne(myquery, newvalues, function (err, resp) {
      if (err) throw err;
      console.log("1 document updated");
      res.redirect("/restaurant_dashboard");
    });

  });
});
router.get('/shelter_profile', function (req, res, next) {
  console.log("get shelter_profile");
  var lang = constants.properties.lang;
  console.log(lang);
  console.log(req.session.user);
  var msgs = messages.page.shelter_dashboard[lang];
  var msgsVar = messages.page.rest_profile[lang];
  var msgsFormVar = messages.page.signup[lang];
  //var msgsVar = "hello";
  //console.log(msgsVar);

  var shelter = {};
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    dbo.collection("shelters").find({}).toArray(function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        console.log("inside collection");
        if (req.session.user.username == result[i].username) {
          shelter.name = result[i].name;
          shelter.phone = result[i].phone;
          shelter.emailid = result[i].emailid;
          shelter.addr = result[i].addr;
          shelter.city = result[i].city;
          shelter.state = result[i].state;
          shelter.zip = result[i].zip;
        }
      }
      var sname = shelter.name.toUpperCase();
      console.log(sname);
      res.render('shelter_profile', {
        msgsValues:msgs,
        msgs: msgsVar,
        formFields: msgsFormVar,
        user: req.session.user,
        langCode: lang,
        profile: shelter,
        name: sname
      }
      );
    });
  });

});
router.post('/shelter_profile', function (req, res, next) {
  console.log(req.body);
  var shelter = {};
  var username = req.session.user.username;
  // rest.username = username;
  // rest.name = req.body.rname;
  shelter.phone = req.body.rphone;
  shelter.emailid = req.body.remailid;
  shelter.addr = req.body.raddr;
  shelter.city = req.body.rcity;
  shelter.state = req.body.rstate;
  shelter.zip = req.body.rzip;
  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    var myquery = { username: username };
    var newvalues = { $set: shelter };
    dbo.collection("shelters").updateOne(myquery, newvalues, function (err, resp) {
      if (err) throw err;
      console.log("1 document updated");
      res.redirect("/shelter_dashboard");
    });

  });
});
router.post('/vol_profile', function (req, res, next) {
  console.log(req.body);
  var vol = {};
  var username = req.session.user.username;
  // rest.username = username;
  // rest.name = req.body.rname;
  vol.phone = req.body.rphone;
  vol.emailid = req.body.remailid;
  vol.shelter = {
    "username": req.body.shelter,
    "name": ""
  };

  MongoClient.connect("mongodb://localhost:27017/foodstrap", function (err, db) {
    if (!err) {
      console.log("We are connected");
    }
    var dbo = db.db("foodstrap");
    var myquery = { username: username };
    var newvalues = { $set: vol };
    dbo.collection("volunteers").updateOne(myquery, newvalues, function (err, resp) {
      if (err) throw err;
      console.log("1 document updated");
      res.redirect("/volunteer_dashboard");
    });

  });
});


module.exports = router;
