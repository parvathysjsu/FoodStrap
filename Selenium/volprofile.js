var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class volprofile extends BasePage{
    updateprofile(){
        driver.wait(until.elementLocated(By.css('#remailid'))).clear();
        driver.wait(until.elementLocated(By.css('#remailid'))).sendKeys('volunteer@gmail.com');
        driver.wait(until.elementLocated(By.css('#shelter'))).click();
        driver.wait(until.elementLocated(By.css('#shelter'))).sendKeys('Goodwill Ambassador');
        driver.wait(until.elementLocated(By.css('#shelter'))).click();
        driver.wait(until.elementLocated(By.css('#updateprofile'))).click();

        return require('./voldb');
    }
}
module.exports = new volprofile();
