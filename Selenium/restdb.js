var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class restdb extends BasePage{
    clickOnDonate(){
        driver.wait(until.elementLocated(By.id('donate'))).click();
        return require('./donate')
}
donatehistory(){
    driver.wait(until.elementLocated(By.css('#span'))).click();
    driver.wait(until.elementLocated(By.xpath("//a[@href='/donationshistory']"))).click();
    return require('./donhistory')
}
donProcess(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/donationprocess']"))).click();
        return require('./donprocess')
    }
    donProfile(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/rest_profile']"))).click();
        return require('./restprofile')
    }
    donlogout(){
        driver.wait(until.elementLocated(By.css('#span'))).click();
        driver.wait(until.elementLocated(By.xpath("//a[@href='/']"))).click();
        return require('./home')
    }

}
module.exports = new restdb();
