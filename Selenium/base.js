var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

class BasePage{
    constructor() {
        global.driver = driver;
    }
    navigateToHome() {
        driver.get("http://localhost:3000/");
    }
}
module.exports = BasePage;