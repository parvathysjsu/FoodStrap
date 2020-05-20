var homepage = require('./home');
homepage.navigateToHome();
var signin = homepage.clickOnSignin();
var shelterdb = signin.signinshelt();
var claim = shelterdb.claim();
var confclaim = claim.claimdon();
confclaim.confirmclaim();