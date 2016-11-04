var loginPage = require('../pageobjects/login');
var cleanup = require('../cleanup');
var Promise = require('promise');


describe('login', function () {

    afterEach(() => {
        cleanup.removeDB();
    });

    it('should login', function () {
        browser.get(loginPage.getUrl());
        var inputEmail = loginPage.inputEmail().click()
            .then(()=> loginPage.inputEmail().sendKeys('appUser@admin.ch'));
        var inputPassword = loginPage.inputPassword().click()
            .then(()=> loginPage.inputPassword().sendKeys('pwd'));

        return Promise.all([inputEmail, inputPassword])
            .then(() =>
                loginPage.loginButton().click()
                    .then(() =>
                        browser.getCurrentUrl()
                            .then(url => expect(url).not.toEqual(loginPage.getUrl()))
                    )
            );
    });
});