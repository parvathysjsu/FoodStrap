var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class claim extends BasePage{
    confirmclaim(){

        driver.wait(until.elementLocated(By.xpath("//a[@href='/claimdonation']"))).click();
        return require('./shelterdb');
    }
}
module.exports = new claim();
