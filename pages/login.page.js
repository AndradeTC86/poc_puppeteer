const BasePage = require('./base.page')

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#user-name'
        this.passwordInput = '#password'
        this.loginButton = '#login-button'
    }

    async login(username, password) {
        await this.type(this.usernameInput, username)
        await this.type(this.passwordInput, password)
        await this.click(this.loginButton)
    }
}

module.exports = LoginPage