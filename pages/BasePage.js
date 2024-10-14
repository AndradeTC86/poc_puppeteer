class BasePage {
    constructor(page) {
        this.page = page
    }

    async navigate(url) {
        await this.page.goto(url)
    }

    async waitForSelector(selector) {
        await this.page.waitForSelector(selector)
    }

    async click(selector) {
        await this.page.click(selector)
    }

    async type(selector, text) {
        await this.page.type(selector, text)
    }

    async getText(selector) {
        return await this.page.$eval(selector, el => el.textContent)
    }
}

module.exports = BasePage