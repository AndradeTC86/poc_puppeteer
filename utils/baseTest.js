
const puppeteer = require('puppeteer')

class BaseTest {
    async setup() {
        this.browser = await puppeteer.launch({ headless: false, 
            args: ['--disable-gpu',
                 '--no-sandbox',
                 '--disable-setuid-sandbox', 
                 '--disable-infobars', 
                 '--disable-extensions', 
                 '--disable-popup-blocking', 
                 '--disable-web-security', 
                 '--start-maximized'], 
            defaultViewport: null })
        this.page = await this.browser.newPage()
    }

    async teardown() {
        await this.browser.close()
    }
}

module.exports = BaseTest