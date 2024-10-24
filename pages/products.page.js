const BasePage = require('./base.page')
const produto = require('../fixtures/produtos.json')

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

    getBtnAddToCart(produto){
        return `[data-test="add-to-cart-${produto}"]`
    }

    getBtnRemoveFromCart(produto){
        return `[data-test="remove-${produto}"]`
    }

    async clickBtnAddToCart(){
        await this.click(this.getBtnAddToCart(produto[0].produto))
    }

    async clickBtnRemoveFromCart(){
        await this.click(this.getBtnRemoveFromCart(produto[0].produto))
    }

    async clickBtnAddToCartFromProductPage(){
        await this.click(this.btnAddToCart)
    }

    async clickBtnRemoveFromCartFromProductPage(){
        await this.click(this.btnRemoveFromCart)
    }
    
    async clickBtnAddToCartAllProducts(){
        for (const produtos of produto){
            await this.click(this.getBtnAddToCart(produtos.produto))
        }
    }

    async clickBtnRemoveFromCartAllProducts(){
        for (const produtos of produto){
            await this.click(this.getBtnRemoveFromCart(produtos.produto))
        }
    }

    async clickBtnGoToCart(){
        await this.click(this.btnCart)
    }

    async clickLinkBackToProducts(){
        await this.click(this.lnkBackToProducts)
    }

    async clickImgProduct(){
        await this.click(this.imgProduct)
    }

    async orderBy(optionText){
        await this.page.select(this.menuOrdenar, optionText)
    }

    async orderByNameZtoA() {
        await this.orderBy('Name (Z to A)');
    }
    
    async orderByPriceLowToHigh() {
        await this.orderBy('Price (low to high)');
    }
    
    async orderByPriceHighToLow() {
        await this.orderBy('Price (high to low)');
    }

    async validateBdgShoppingCartNumber(number){
        const badgeText = await this.page.$eval(this.bdgShoppingCart, el => el.textContent)
        expect(badgeText).toBe(String(number))
    }

    async validateBdgShoppingCartNotVisible(){
        const isVisible = await this.page.$(this.bdgShoppingCart) !== null
        expect(isVisible).toBeFalsy()
    }

    async validateBtnAddToCartFromProductPageVisible(){
        const isVisible = await this.page.$(this.btnAddToCart) !== null
        expect(isVisible).toBeTruthy()
    }

    async validateBtnRemoveFromCartFromProductPageVisible(){
        const isVisible = await this.page.$(this.btnRemoveFromCart) !== null
        expect(isVisible).toBeTruthy()
    }

    async validateBtnAddToCartVisible(){
        const isVisible = await this.page.$(this.getBtnAddToCart(produto[0].produto)) !== null
        expect(isVisible).toBeTruthy()
    }

    async validateBtnRemoveFromCartVisible(){
        const isVisible = await this.page.$(this.getBtnRemoveFromCart(produto[0].produto)) !== null
        expect(isVisible).toBeTruthy()
    }

    async validateResponseTime(){    
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
    
    async validateWrongImage(){
        const imgSrc = await this.page.$eval(this.imgProduct, img => img.getAttribute('src'))
        expect(imgSrc).toBe("/static/media/sl-404.168b1cce.jpg")
    }

    async validateLargeImage(){
        const imgElement = await this.page.$(this.imgProduct)
        const boundingBox = await imgElement.boundingBox()
        const width = Math.round(boundingBox.width)
        const height = Math.round(boundingBox.height)
        expect(width).toBe(262)
        expect(height).toBe(238) 
    }

    async validateSortedProductsAtoZ() {
        const items = await this.page.$$eval(this.lblItemName, els => els.map(el => el.textContent));
        const sortedItems = [...items].sort();
        expect(items).toEqual(sortedItems);
      }
    
      async validateSortedProductsZtoA() {
        const items = await this.page.$$eval(this.lblItemName, els => els.map(el => el.textContent));
        const sortedItems = [...items].sort().reverse();
        expect(items).toEqual(sortedItems);
      }
    
      async validateSortedProductsLowToHigh() {
        const items = await this.page.$$eval(this.lblItemPrice, els => els.map(el => parseFloat(el.textContent.replace('$', ''))));
        const sortedPrices = [...items].sort((a, b) => a - b);
        expect(items).toEqual(sortedPrices);
      }
    
      async validateSortedProductsHighToLow() {
        const items = await this.page.$$eval(this.lblItemPrice, els => els.map(el => parseFloat(el.textContent.replace('$', ''))));
        const sortedPrices = [...items].sort((a, b) => b - a);
        expect(items).toEqual(sortedPrices);
      }
}

module.exports = ProductsPage