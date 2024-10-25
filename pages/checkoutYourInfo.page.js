const BasePage = require('./base.page')

class CheckoutYourInfoPage extends BasePage {
    constructor(page){
        super(page)
        this.lblTitle = '[data-test="title"]';
        this.btnCancel = '[data-test="cancel"]';
        this.btnContinue = '[data-test="continue"]';
        this.txtFirstName = '[data-test="firstName"]';
        this.txtLastName = '[data-test="lastName"]';
        this.txtZipCode = '[data-test="postalCode"]';
        this.msgError = '.error-message-container';     
    }

    async validatePageTitle(){
        const titletext = await this.getText(this.lblTitle)
        expect(titletext).toBe('Checkout: Your Information')
    }

    async validatePageUrl(){
        const currentUrl = await this.getCurrentUrl()
        expect(currentUrl).toBe('https://www.saucedemo.com/checkout-step-one.html')
    }

    async clickBtnCancel(){
        await this.page.click(this.btnCancel)
    }

    async clickBtnContinue(){
        await this.page.click(this.btnContinue)
    }

    async validateTxtFirstNameEmpty(){
        const firstNameValue = await this.page.$eval(this.txtFirstName, el => el.value)
        expect(firstNameValue).toBe('')
    }

    async validateTxtLastNameEmpty(){
        const lastNameValue = await this.page.$eval(this.txtLastName, el => el.value)
        expect(lastNameValue).toBe('')
    }

    async validateTxtZipCodeEmpty(){
        const zipCodeValue = await this.page.$eval(this.txtZipCode, el => el.value)
        expect(zipCodeValue).toBe('')
    }

    async fillTextFields(firstName, lastName, zipCode){
        await this.page.type(this.txtFirstName, firstName)
        await this.page.type(this.txtLastName, lastName)
        await this.page.type(this.txtZipCode, zipCode)
    }

    async fillTxtFirstName(firstName){
        await this.page.type(this.txtFirstName, firstName)
    }

    async fillTxtLastName(lastName){
        await this.page.type(this.txtLastName, lastName)
    }

    async validateFirstNameRequiredMessage(){
        const errorMessage = await this.page.$eval(this.msgError, el => el.textContent)
        expect(errorMessage).toBe('Error: First Name is required')
    }

    async validateLastNameRequiredMessage(){
        const errorMessage = await this.page.$eval(this.msgError, el => el.textContent)
        expect(errorMessage).toBe('Error: Last Name is required')
    }

    async validateZipCodeRequiredMessage(){
        const errorMessage = await this.page.$eval(this.msgError, el => el.textContent)
        expect(errorMessage).toBe('Error: Postal Code is required')
    }
}

module.exports = CheckoutYourInfoPage