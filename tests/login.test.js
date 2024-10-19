
const BaseTest = require('../utils/baseTest')
const LoginPage = require('../pages/login.page')
const ProductPage = require('../pages/products.page')
const login = require('../fixtures/login.json')

describe('Login Tests', () => {
    let baseTest
    let loginPage
    let productPage

    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        loginPage = new LoginPage(baseTest.page)
        productPage = new ProductPage(baseTest.page)
        await loginPage.navigate('/')
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    test('Realizar login com usuário standard', async () => {
        await loginPage.login(login.standard, login.password)        
        await productPage.validatePageTitle()
        await productPage.validatePageUrl()
    })

    test('Realizar login com usuário bloqueado', async () => {
        await loginPage.login(login.locked, login.password)
        await loginPage.validateLockedUserMessage()
    })

    test('Realizar login com usuário com erros de performance', async () => {
        await loginPage.login(login.performance, login.password)
        await productPage.validateResponseTime()    
    }, 10000)
})