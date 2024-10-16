
const BaseTest = require('../utils/baseTest')
const LoginPage = require('../pages/login.page')
const login = require('../fixtures/login.json')

describe('Login Tests', () => {
    let baseTest
    let loginPage

    beforeAll(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        loginPage = new LoginPage(baseTest.page)        
    })

    beforeEach(async () => {
        await loginPage.navigate('/')
    })

    afterAll(async () => {
        await baseTest.teardown()
    })

    test('should login with valid credentials', async () => {
        await loginPage.login(login.standard, login.password)        
        const title = await loginPage.getText('.title')
        expect(title).toBe('Products')
    })
})