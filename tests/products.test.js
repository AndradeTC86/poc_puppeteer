const { autoLogin } = require( "../commands/commands")
const BaseTest = require('../utils/baseTest')
const ProductPage = require('../pages/products.page')
const YourCartPage = require('../pages/yourCart.page')

describe('Testar feature lista de produtos', () => {
    let baseTest
    let productPage
    
    beforeEach(async () => {
        baseTest = new BaseTest()
        await baseTest.setup()
        productPage = new ProductPage(baseTest.page)
        await autoLogin(baseTest.page)        
        await productPage.validatePageTitle()
        await productPage.validatePageUrl()
    })

    afterEach(async () => {
        await baseTest.teardown()
    })

    test('Inserir produto no carrinho e validar que foi gravado corretamente no carrinho', async ({ page }) => {
        await productPage.clickBtnAddToCart()
        await productPage.validateBdgShoppingCartNumber('1')
        await productPage.clickBtnGoToCart()
        let yourCartPage = new YourCartPage(baseTest.page)
        await yourCartPage.validateProductName()
    })

    test('Remover produto do carrinho pela página de produtos', async () => {
        await productPage.clickBtnAddToCart()
        await productPage.validateBdgShoppingCartNumber('1')
        await productPage.validateBtnRemoveFromCartVisible()
        await productPage.clickBtnRemoveFromCart()
        await productPage.validateBdgShoppingCartNotVisible()
        await productPage.validateBtnAddToCartVisible()
    })

    test('Adicionar produto no carrinho pela página do produto e verificar que gravou corretamente no carrinho', async ({ page }) => {
        await productPage.clickImgProduct()
        await productPage.clickBtnAddToCartFromProductPage()
        await productPage.validateBdgShoppingCartNumber('1')
        await productPage.clickBtnGoToCart()
        let yourCartPage = new YourCartPage(baseTest.page)
        await yourCartPage.validateProductName()
    })

    test('Remover produto do carrinho pela página do produto e voltar a página de produtos', async () => {
        await productPage.clickBtnAddToCart()
        await productPage.validateBdgShoppingCartNumber('1')
        await productPage.clickImgProduct()
        await productPage.validateBtnRemoveFromCartFromProductPageVisible()
        await productPage.clickBtnRemoveFromCartFromProductPage()
        await productPage.validateBdgShoppingCartNotVisible()
        await productPage.validateBtnAddToCartFromProductPageVisible()
        await productPage.clickLinkBackToProducts()
        await productPage.validatePageTitle()
    })

    test('Validar adicionar e remover todos os produtos no carrinho', async () => {
        await productPage.clickBtnAddToCartAllProducts()
        await productPage.validateBdgShoppingCartNumber('6')
        await productPage.clickBtnRemoveFromCartAllProducts()
        await productPage.validateBdgShoppingCartNotVisible()
    })

    test('Validar ordenação padrão em ordem alfabética crescente', async () => {
        await productPage.validateSortedProductsAtoZ()
    })

    test('Ordenar produtos em ordem alfabética decrescente', async () => {
        await productPage.orderByNameZtoA()
        await productPage.validateSortedProductsZtoA()
    })

    test('Ordenar produtos em preço do menor para o maior', async () => {
        await productPage.orderByPriceLowToHigh()
        await productPage.validateSortedProductsLowToHigh()
    })

    test('Ordenar produtos em preço do maior para o menor', async () => {
        await productPage.orderByPriceHighToLow()
        await productPage.validateSortedProductsHighToLow()
    })

})