
const puppeteer = require('puppeteer')

class BaseTest {
    async setup() {
        this.browser = await puppeteer.launch({ headless: false })
        this.page = await this.browser.newPage()
    }

    async teardown() {
        await this.browser.close()
    }
}

module.exports = BaseTest