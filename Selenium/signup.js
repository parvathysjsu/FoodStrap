var webdriver = require('selenium-webdriver');
var BasePage = require('./base');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;
class Signup extends BasePage{
    fillSignup(){
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.wait(until.elementLocated(By.css('#usertype'))).sendKeys('restaurant');
        driver.wait(until.elementLocated(By.css('#usertype'))).click();
        driver.wait(until.elementLocated(By.css('#username'))).sendKeys('rest5');
        driver.wait(until.elementLocated(By.css('#pass'))).sendKeys('rest5');
        driver.wait(until.elementLocated(By.css('#rname'))).sendKeys('DinTaiFung');
        driver.wait(until.elementLocated(By.css('#rcuisine'))).sendKeys('chinese');
        driver.wait(until.elementLocated(By.css('#rphone'))).sendKeys('1112223666');
        driver.wait(until.elementLocated(By.css('#remailid'))).sendKeys('dintaifung@gmail.com');
        driver.wait(until.elementLocated(By.css('#raddr'))).sendKeys('4700 Glenville Rd');
        driver.wait(until.elementLocated(By.css('#rcity'))).sendKeys('San Ramon');
        driver.wait(until.elementLocated(By.css('#rstate'))).sendKeys('CA');
        driver.wait(until.elementLocated(By.css('#rzip'))).sendKeys('94582');
        driver.wait(until.elementLocated(By.id('signup'))).click();
        return require('./signin')
    }
}
module.exports = new Signup();
