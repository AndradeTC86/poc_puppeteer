const LoginPage = require('../pages/login.page')
//const ProductPage = require('../pages/products.page')
const login = require('../fixtures/login.json')

async function autoLogin(page) {
    const loginPage = new LoginPage(page)
    await loginPage.navigate('/')
    await loginPage.login(login.standard, login.password)
}

module.exports = { autoLogin }