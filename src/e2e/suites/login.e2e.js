var loginPage = require('../pageobjects/login');
var shopplingListPage = require('../pageobjects/shopplingList');
var cleanup = require('../cleanup');
var Promise = require('promise');


describe('login', function () {

    beforeEach(() => {
        return cleanup.cleanupDb();
    });

    it('should login', function () {
        browser.get(loginPage.getUrl());
        var inputEmail = loginPage.inputEmail().click()
            .then(() => loginPage.inputEmail().sendKeys('e2e@admin.ch'));
        var inputPassword = loginPage.inputPassword().click()
            .then(() => loginPage.inputPassword().sendKeys('pwd'));

        return Promise.all([inputEmail, inputPassword])
            .then(() =>
                loginPage.loginButton().click()
                    .then(() =>
                        browser.getCurrentUrl()
                            .then(url => expect(url).toEqual(shopplingListPage.getUrl()))
                    )
            );
    });

    it('should not login wrong email', function () {
        browser.get(loginPage.getUrl());
        var inputEmail = loginPage.inputEmail().click()
            .then(() => loginPage.inputEmail().sendKeys('e2e@admi.ch'));
        var inputPassword = loginPage.inputPassword().click()
            .then(() => loginPage.inputPassword().sendKeys('pwd'));

        return Promise.all([inputEmail, inputPassword])
            .then(() =>
                loginPage.loginButton().click()
                    .then(() =>
                        browser.getCurrentUrl()
                            .then(url => expect(url).toEqual(loginPage.getUrl()))
                    )
            );
    });


    it('should not login wrong password', function () {
        browser.get(loginPage.getUrl());
        var inputEmail = loginPage.inputEmail().click()
            .then(() => loginPage.inputEmail().sendKeys('e2e@admin.ch'));
        var inputPassword = loginPage.inputPassword().click()
            .then(() => loginPage.inputPassword().sendKeys('pw'));

        return Promise.all([inputEmail, inputPassword])
            .then(() =>
                loginPage.loginButton().click()
                    .then(() =>
                        browser.getCurrentUrl()
                            .then(url => expect(url).toEqual(loginPage.getUrl()))
                    )
            );
    });
});