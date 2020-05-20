var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class donprocess extends BasePage{
    backtodashboard(){
        driver.sleep(20000);
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/restaurant_dashboard']"))).click();
        return require('./restdb');
    }
}
module.exports = new donprocess();
