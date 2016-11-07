module.exports = (function () {

    var inputEmail = element.all(by.className('input--login')).get(0).element(by.tagName('input'));
    var inputPassword = element.all(by.className('input--login')).get(1).element(by.tagName('input'));
    var loginButton = element(by.className('btn--login'));

    return {
        loginButton: () => loginButton,
        inputEmail: () => inputEmail,
        inputPassword: () => inputPassword,
        getUrl: () => 'http://localhost:8080/login'
    };
})();
