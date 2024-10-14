const BaseTest = require('../pages/BaseTest')
const LoginPage = require('../pages/LoginPage')
const config = require('../utils/config')

describe('Login Tests', () => {
    let baseTest, loginPage

    before(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        loginPage = new LoginPage(baseTest.page)
    })

    after(async () => {
        await baseTest.teardown()
    })

    it('should login with valid credentials', async () => {
        await loginPage.navigate(config.baseURL)
        await loginPage.login('standard_user', 'secret_sauce')
    })
})