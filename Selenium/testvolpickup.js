var homepage = require('./home');
homepage.navigateToHome();
var signin = homepage.clickOnSignin();
var voldb = signin.signinvol();
var pickup = voldb.pickup();
var confpickup = pickup.confirmpickup();
