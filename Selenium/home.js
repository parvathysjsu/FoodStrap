var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class Homepage extends BasePage{
    clickOnDonors(){
        driver.findElement(By.xpath("//a[@href='/donors']")).click();
        return require('./donor');
    }
    clickOnSignin(){
        driver.findElement(By.xpath("//a[@href='/signin']")).click();
        return require('./signin');
    }
}
module.exports = new Homepage();
