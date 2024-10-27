const BaseTest = require('../utils/baseTest')
const ProductsPage = require('../pages/products.page')
const YourCartPage = require('../pages/yourCart.page')
const CheckoutYourInfoPage = require('../pages/checkoutYourInfo.page')
const { setCart } = require('../commands/commands')

describe('Testar feature Your Cart', () => {
    let baseTest
    let yourCartPage
    
    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        yourCartPage = new YourCartPage(baseTest.page)
        await setCart(baseTest.page)        
        await yourCartPage.validatePageTitle()
        await yourCartPage.validatePageUrl()
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    test('Validar botão continuar comprando', async ({ page }) => {
        await yourCartPage.clickBtnContinueShopping()
        let productsPage = new ProductsPage(baseTest.page)
        await productsPage.validatePageTitle()
        
    })

    test('Validar botão remover produto', async () => {
        await yourCartPage.clickBtnRemoveFromCart()
        await yourCartPage.validateProductNameNotVisible()
    })

    test('Validar botão checkout', async ({ page }) => {
        await yourCartPage.clickBtnCheckout()
        let checkoutYourInfo = new CheckoutYourInfoPage(baseTest.page)
        await checkoutYourInfo.validatePageTitle()
    })
})