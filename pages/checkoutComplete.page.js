const BasePage = require('./base.page')

class CheckoutCompletePage extends BasePage {
    constructor(page){
        super(page)
        this.lblTitle = '[data-test="title"]'
        this.btnBackHome = '[data-test="back-to-products"]'
        this.msgHeader = '.complete-header'
        this.msgOrder = '.complete-text'     
    }

    async validatePageTitle(){
        const titletext = await this.getText(this.lblTitle)
        expect(titletext).toBe('Checkout: Complete!')
    }

    async validatePageUrl(){
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).toBe('https://www.saucedemo.com/checkout-complete.html')
    }

    async validateHeaderMessage(){
        const headerMessage = await this.getText(this.msgHeader)
        expect(headerMessage).toBe('Thank you for your order!')
    }

    async validateOrderMessage(){
        const orderMessage = await this.getText(this.msgOrder)
        expect(orderMessage).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    }

    async clickBtnBackToHome(){
        await this.page.click(this.btnBackHome)
    }
}

module.exports = CheckoutCompletePage