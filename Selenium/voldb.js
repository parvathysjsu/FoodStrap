var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class voldb extends BasePage{
    pickup(){

        driver.wait(until.elementLocated(By.css('#pickup'))).click();
        return require('./pickup')
    }

    volProfile(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/vol_profile']"))).click();
        return require('./volprofile')
    }
    vollogout(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/']"))).click();
        return require('./home')
    }

}
module.exports = new voldb();
