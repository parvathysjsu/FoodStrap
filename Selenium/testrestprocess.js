var homepage = require('./home');
homepage.navigateToHome();
var signin = homepage.clickOnSignin();
var restdb = signin.signinrest();
var dprocess = restdb.donProcess();

