var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class pickup extends BasePage{
    confirmpickup(){

        driver.wait(until.elementLocated(By.css("#confirmpickup"))).click();
        return require('./voldb');
    }
}
module.exports = new pickup();
