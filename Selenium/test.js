/*var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
driver.get("ec2-3-101-76-67.us-west-1.compute.amazonaws.com:5000/");
driver.findElement(By.xpath("//a[@href='/donors']")).click();
driver.sleep(2000)
driver.wait(until.elementLocated(By.css('.vertify-booking'))).click();


//var selElement = driver.findElement(By.id('usertype'));
//selElement.click();
//selElement.sendKeys('restaurant');
//selElement.click();
driver.wait(until.elementLocated(By.css('#usertype'))).click();
driver.wait(until.elementLocated(By.css('#usertype'))).sendKeys('restaurant');
driver.wait(until.elementLocated(By.css('#usertype'))).click();
driver.wait(until.elementLocated(By.css('#username'))).sendKeys('rest4');
driver.wait(until.elementLocated(By.css('#pass'))).sendKeys('rest4');
driver.wait(until.elementLocated(By.css('#rname'))).sendKeys('phoenix');
driver.wait(until.elementLocated(By.css('#rcuisine'))).sendKeys('indian');
driver.wait(until.elementLocated(By.css('#rphone'))).sendKeys('1112223333');
driver.wait(until.elementLocated(By.css('#remailid'))).sendKeys('phoenix@gmail.com');
driver.wait(until.elementLocated(By.css('#raddr'))).sendKeys('4850 Santa Rita Rd');
driver.wait(until.elementLocated(By.css('#rcity'))).sendKeys('Dublin');
driver.wait(until.elementLocated(By.css('#rstate'))).sendKeys('CA');
driver.wait(until.elementLocated(By.css('#rzip'))).sendKeys('94568');
driver.wait(until.elementLocated(By.css('.s'))).click();
//driver.executeScript('window.open("http://ec2-3-101-76-67.us-west-1.compute.amazonaws.com:5000/signin");')

//driver.navigate().to("http://ec2-3-101-76-67.us-west-1.compute.amazonaws.com:5000/signin");*/
var homepage = require('./home');
//var donor= require('./donor');
homepage.navigateToHome();
var donor = homepage.clickOnDonors();
var signup = donor.clickOnSignUp();
signup.fillSignup();


