const { autoLogin } = require( "../commands/commands")
const BaseTest = require('../utils/baseTest')
const ProductPage = require('../pages/products.page')

describe('Testar feature lista de produtos', () => {
    let baseTest
    let productPage
    
    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        productPage = new ProductPage(baseTest.page)
        await autoLogin(baseTest.page)        
        await productPage.validatePageTitle()
        await productPage.validatePageUrl()
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    test('Inserir produto no carrinho e validar que foi gravado corretamente no carrinho', async ({ page }) => {
        
    })

})