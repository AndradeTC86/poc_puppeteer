const BaseTest = require('../utils/baseTest')
const ProductsPage = require('../pages/products.page')
const CheckoutCompletePage = require('../pages/checkoutComplete.page')
const { setCheckoutComplete } = require('../commands/commands')

describe('Testar feature Checkout Complete', () => {
    let baseTest
    let checkoutCompletePage
    
    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        checkoutCompletePage = new CheckoutCompletePage(baseTest.page)
        await setCheckoutComplete(baseTest.page)        
        await checkoutCompletePage.validatePageTitle()
        await checkoutCompletePage.validatePageUrl()
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    //Estudar o motivo desse teste apresentar erro na execução
    test('Clicar no botão voltar para home deve voltar a página de produtos', async ({ page }) => {
        await checkoutCompletePage.clickBtnBackToHome()
        let productsPage = new ProductsPage(baseTest.page)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()        
    })
})
