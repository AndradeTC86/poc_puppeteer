const BaseTest = require('../utils/baseTest')
const CheckoutOverviewPage = require('../pages/checkoutYourInfo.page')
const ProductsPage = require('../pages/products.page')
const CheckoutCompletePage = require('../pages/checkoutComplete.page')
const { setCheckoutOverview } = require('../commands/commands')

describe('Testar feature Checkout Overview', () => {
    let baseTest
    let checkoutOverviewPage
    
    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        checkoutOverviewPage = new CheckoutOverviewPage(baseTest.page)
        await setCheckoutOverview(baseTest.page)        
        await checkoutOverviewPage.validatePageTitle()
        await checkoutOverviewPage.validatePageUrl()
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    //Estudar o motivo desse teste apresentar erro na execução
    test('Botão cancelar deve voltar para a página de produtos', async ({ page }) => {
        await checkoutOverviewPage.clickBtnCancel()
        let productsPage = new ProductsPage(baseTest.page)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()        
    })

    //Estudar o motivo desse teste apresentar erro na execução
    test('Botão continuar deve finalizar o pedido', async ({ page }) => {        
        await checkoutOverviewPage.clickBtnContinue()
        let checkoutCompletePage = new CheckoutCompletePage(baseTest.page)
        await checkoutCompletePage.validatePageTitle()
        await checkoutCompletePage.validatePageUrl()
        await checkoutCompletePage.validateHeaderMessage()
        await checkoutCompletePage.validateOrderMessage()
    })
})
