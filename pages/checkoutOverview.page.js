const BasePage = require('./base.page')

class CheckoutOverviewPage extends BasePage {
    constructor(page){
        super(page)
        this.lblTitle = '[data-test="title"]'
        this.btnCancel = '[data-test="cancel"]'
        this.btnContinue = '[data-test="finish"]'     
    }

    async validatePageTitle(){
        const titletext = await this.getText(this.lblTitle)
        expect(titletext).toBe('Checkout: Overview')
    }

    async validatePageUrl(){
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).toBe('https://www.saucedemo.com/checkout-step-two.html')
    }

    async clickBtnCancel(){
        await this.page.click(this.btnCancel)
    }

    async clickBtnContinue(){
        await this.page.click(this.btnContinue)
    }
}

module.exports = CheckoutOverviewPage