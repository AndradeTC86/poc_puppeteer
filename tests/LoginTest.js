
const BaseTest = require('../utils/BaseTest')
const LoginPage = require('../pages/LoginPage')
const config = require('../utils/config')

describe('Login Tests', () => {
    let baseTest
    let loginPage

    beforeAll(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        loginPage = new LoginPage(baseTest.page)
    })

    afterAll(async () => {
        await baseTest.teardown()
    })

    test('should login with valid credentials', async () => {
        await loginPage.navigate(config.baseURL)
        await loginPage.login('standard_user', 'secret_sauce')
        // Adicione verificações usando expect
        const title = await loginPage.getText('.title')
        expect(title).toBe('Products')
    })
})