var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class shelthistory extends BasePage{
    backtodashboard(){
        driver.sleep(20000);
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/shelter_dashboard']"))).click();
        return require('./shelterdb');
    }
}
module.exports = new shelthistory();
