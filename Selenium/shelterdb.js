var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class shelterdb extends BasePage{
    claim(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/shelter_claim']"))).click();
        return require('./sheltclaim')
    }
    shelthistory(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/past_claim']"))).click();
        return require('./shelthistory')
    }

    sheltProfile(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/shelt_profile']"))).click();
        return require('./sheltprofile')
    }
    sheltlogout(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/']"))).click();
        return require('./home')
    }

}
module.exports = new shelterdb();
