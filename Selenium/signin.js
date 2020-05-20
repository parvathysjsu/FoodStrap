var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class Signin extends BasePage{
    signinrest(){
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.wait(until.elementLocated(By.css('#usertype'))).sendKeys('restaurant');
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.sleep(10000)
        driver.wait(until.elementLocated(By.css('#username'))).sendKeys('rest4');
        driver.wait(until.elementLocated(By.css('#pass'))).sendKeys('rest4');
        driver.wait(until.elementLocated(By.id('signin'))).click();
        return require('./restdb')
    }
    signinshelt(){
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.wait(until.elementLocated(By.css('#usertype'))).sendKeys('shelter');
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.wait(until.elementLocated(By.css('#username'))).sendKeys('shelt1');
        driver.wait(until.elementLocated(By.css('#pass'))).sendKeys('shelt123');
        driver.wait(until.elementLocated(By.id('signin'))).click();
        return require('./shelterdb')
    }
    signinvol(){
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.wait(until.elementLocated(By.css('#usertype'))).sendKeys('volunteer');
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.wait(until.elementLocated(By.css('#username'))).sendKeys('vol1');
        driver.wait(until.elementLocated(By.css('#pass'))).sendKeys('vol123');
        driver.wait(until.elementLocated(By.id('signin'))).click();
        return require('./voldb')
    }
}
module.exports = new Signin();
