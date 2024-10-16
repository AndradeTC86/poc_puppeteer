const BasePage = require('./base.page')

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.inputUsername = '#user-name'
        this.inputPassword = '#password'
        this.btnLogin = '#login-button'
        this.msgLockedUser = '[data-test="error"]'
    }

    async login(username, password) {
        await this.type(this.inputUsername, username)
        await this.type(this.inputPassword, password)
        await this.click(this.btnLogin)
    }

    async validateLockedUserMessage(){
        const errorMessage = await this.getText(this.msgLockedUser)
        expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.')
    }
}

module.exports = LoginPage