const BaseTest = require('../utils/baseTest')
const YourCartPage = require('../pages/yourCart.page')
const CheckoutYourInfoPage = require('../pages/checkoutYourInfo.page')
const CheckoutOverviewPage = require('../pages/checkoutYourInfo.page')
const { setCheckout } = require('../commands/commands')
const cliente = require('../fixtures/clientes.json')

describe('Testar feature Checkout Your Information', () => {
    let baseTest
    let checkoutYourInfoPage
    
    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        checkoutYourInfoPage = new CheckoutYourInfoPage(baseTest.page)
        await setCheckout(baseTest.page)        
        await checkoutYourInfoPage.validatePageTitle()
        await checkoutYourInfoPage.validatePageUrl()
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    test('Clicar botão cancelar deve retornar ao carrinho e não salva as informações', async ({ page }) => {        
        await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
        await checkoutYourInfoPage.clickBtnCancel()
        let yourCartPage = new YourCartPage(baseTest.page)
        await yourCartPage.validatePageTitle()
        await yourCartPage.validatePageUrl()
        await yourCartPage.clickBtnCheckout()
        await checkoutYourInfoPage.validateTxtFirstNameEmpty()
        await checkoutYourInfoPage.validateTxtLastNameEmpty()
        await checkoutYourInfoPage.validateTxtZipCodeEmpty()
    })

    test('Validar preencher os campos de texto e clicar em continuar', async ({ page }) => {        
        await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
        await checkoutYourInfoPage.clickBtnContinue()
        let checkoutOverviewPage = new CheckoutOverviewPage(baseTest.page)
        await checkoutOverviewPage.validatePageTitle()
        await checkoutOverviewPage.validatePageUrl()
    })

    test('Validar obrigatoriedade dos campos de texto', async () => {        
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateFirstNameRequiredMessage()
        await checkoutYourInfoPage.fillTxtFirstName(cliente.firstName)
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateLastNameRequiredMessage()
        await checkoutYourInfoPage.fillTxtLastName(cliente.lastName)
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateZipCodeRequiredMessage()
    })
})