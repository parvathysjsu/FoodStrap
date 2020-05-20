var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class donate extends BasePage{
    confirmdonate(){
        driver.wait(until.elementLocated(By.css('#menu'))).sendKeys('Spring rolls and fried rice');
        driver.wait(until.elementLocated(By.css('#cuisine'))).sendKeys('chinese');
        driver.wait(until.elementLocated(By.css('#count'))).sendKeys('20');
        driver.wait(until.elementLocated(By.css('#allergy'))).sendKeys('nuts and dairy');
        driver.wait(until.elementLocated(By.css('#notes'))).sendKeys('pickup curb side');
        driver.wait(until.elementLocated(By.css('#pickuptime'))).sendKeys('05/06/2020 8:30 PM');
        driver.wait(until.elementLocated(By.css('#addr'))).sendKeys('4700 Glenville Rd');
        driver.wait(until.elementLocated(By.css('#city'))).sendKeys('San Ramon');
        driver.wait(until.elementLocated(By.css('#state'))).sendKeys('CA');
        driver.wait(until.elementLocated(By.css('#zip'))).sendKeys('94582');
        driver.wait(until.elementLocated(By.css('#confirmdonate'))).click();
        console.log("after");
        return require('./restdb');
    }
}
module.exports = new donate();
