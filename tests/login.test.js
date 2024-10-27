
const BaseTest = require('../utils/baseTest')
const LoginPage = require('../pages/login.page')
const ProductsPage = require('../pages/products.page')
const login = require('../fixtures/login.json')

describe('Testar feature login', () => {
    let baseTest
    let loginPage
    let productsPage

    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        loginPage = new LoginPage(baseTest.page)
        productsPage = new ProductsPage(baseTest.page)
        await loginPage.navigate('/')
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    test('Realizar login com usuário standard', async () => {
        await loginPage.login(login.standard, login.password)        
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()
    })

    test('Realizar login com usuário bloqueado', async () => {
        await loginPage.login(login.locked, login.password)
        await loginPage.validateLockedUserMessage()
    })    

    test('Realizar login com usuário com problema', async () => {        
        await loginPage.login(login.problem, login.password)
        await productsPage.validateWrongImage()
    })

    test('Realizar login com usuário com erros de performance', async () => {
        await loginPage.login(login.performance, login.password)
        await productsPage.validateResponseTime()    
    }, 10000)

    test('Realizar login com usuário com erro de layout', async () => {        
        await loginPage.login(login.visual, login.password)
        await productsPage.validateLargeImage()
    })
})