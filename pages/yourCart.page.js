const BasePage = require('./base.page')
const produto = require('../fixtures/produtos.json')

class YourCartPage extends BasePage {
    constructor(page){
        super(page)
        this.lblTitle = '[data-test="title"]'
        this.lblItemName = '[data-test="inventory-item-name"]'
        this.btnContinueShopping = '[data-test="continue-shopping"]'
        this.btnCheckout = '[data-test="checkout"]'     
    }

    async validatePageTitle(){
        const titletext = await this.getText(this.lblTitle)
        expect(titletext).toBe('Your Cart')
    }

    async validatePageUrl(){
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).toBe('https://www.saucedemo.com/cart.html')
    }

    async validateProductName() {
        const itemName = await this.page.$eval(this.lblItemName, el => el.textContent)
        expect(itemName).toBe(produto[0].name)
    }

    async validateProductNameNotVisible(){
        const isVisible = await this.page.$(this.lblItemName)  !== null
        expect(isVisible).toBeFalsy()
    }

    async clickBtnContinueShopping(){
        await this.page.click(this.btnContinueShopping)
    }

    async clickBtnCheckout(){
        await this.page.click(this.btnCheckout)
    }

    getBtnRemoveFromCart(produto){
        return `[data-test="remove-${produto}"]`
    }

    async clickBtnRemoveFromCart(){
        await this.click(this.getBtnRemoveFromCart(produto[0].produto))
    }
    
}

module.exports = YourCartPage