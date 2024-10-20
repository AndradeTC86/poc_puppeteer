const BasePage = require('./base.page')
const produtos = require('../fixtures/produtos.json')

class ProductsPage extends BasePage {
    constructor(page){
        super(page)
        this.lblTitle = '[data-test="title"]'
        this.imgProduct = '[data-test="inventory-item-sauce-labs-backpack-img"]'
        this.btnCart = '[data-test="shopping-cart-link"]'
        this.bdgShoppingCart = '.shopping_cart_badge'
        this.lnkBackToProducts = '[data-test="back-to-products"]'
        this.menuOrdenar = '[data-test="product-sort-container"]'
        this.btnAddToCart = '[data-test="add-to-cart"]'
        this.btnRemoveFromCart = '[data-test="remove"]'
        this.lblItemName = '.inventory_item_name'
        this.lblItemPrice = '.inventory_item_price'
    }

    async validatePageTitle(){
        const titletext = await this.getText(this.lblTitle)
        expect(titletext).toBe('Products')
    }

    async validatePageUrl(){
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html')
    }

    async validateResponseTime() {    
        const startTime = Date.now()
        const response = await this.page.evaluate(async () => {
            const response = await fetch(
                'https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN',
                {
                    method: 'POST',
                }
            )
            return response.status
        })
        const endTime = Date.now()    
        const responseDuration = endTime - startTime
        expect(responseDuration).toBeGreaterThan(400)
    }   
}

module.exports = ProductsPage