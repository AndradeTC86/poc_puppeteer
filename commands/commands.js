const LoginPage = require('../pages/login.page')
const ProductsPage = require('../pages/products.page')
const YourCartPage = require('../pages/yourCart.page')
const CheckoutYourInfoPage = require('../pages/checkoutYourInfo.page')
const CheckoutOverviewPage = require('../pages/checkoutOverview.page')
const login = require('../fixtures/login.json')
const cliente = require('../fixtures/clientes.json')

async function autoLogin(page){
    const loginPage = new LoginPage(page)
    await loginPage.navigate('/')
    await loginPage.login(login.standard, login.password)
}

async function setCart(page){
    await autoLogin(page)
    const productsPage = new ProductsPage(page)
    await productsPage.clickBtnAddToCart()
    await productsPage.clickBtnGoToCart()    
}

async function setCheckout(page){
    await setCart(page)
    const yourCartPage = new YourCartPage(page)
    await yourCartPage.clickBtnCheckout()
}

async function setCheckoutOverview(page){
    await setCheckout(page)
    const checkoutYourInfoPage = new CheckoutYourInfoPage(page)
    await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
    await checkoutYourInfoPage.clickBtnContinue()    
}

async function setCheckoutComplete(page){
    await setCheckoutOverview(page)
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    await checkoutOverviewPage.clickBtnContinue()    
}

module.exports = { 
    autoLogin,
    setCart,
    setCheckout,
    setCheckoutOverview,
    setCheckoutComplete
 }