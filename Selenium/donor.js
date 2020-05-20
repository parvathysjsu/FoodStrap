var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class DonorPage extends BasePage{
    clickOnSignUp(){
       driver.wait(until.elementLocated(By.css('.vertify-booking'))).click();
       return require('./signup')
    }
}
module.exports = new DonorPage();
