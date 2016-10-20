module.exports = (function () {

    var inputEmail = element.all(by.css('[e2e-id="email"] input'));
    var inputPassword = element.all(by.css('[e2e-id="password"] input'));
    var loginButton = element.all(by.css('[e2e-id="loginBtn"]'));

    return {
        loginButton: () => loginButton,
        inputEmail: () => inputEmail,
        inputPassword: () => inputPassword,
        getUrl: () => 'http://localhost:8080/login'
    }
})();
