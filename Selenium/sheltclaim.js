var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class sheltclaim extends BasePage{
    claimdon(){

        driver.wait(until.elementLocated(By.css('#claim'))).click();
        return require('./claim');
    }
}
module.exports = new sheltclaim();
