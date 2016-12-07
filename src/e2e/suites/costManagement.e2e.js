var loginPage = require('../pageobjects/login');
var costManagementPage = require('../pageobjects/costManagement');
var cleanup = require('../cleanup');
var Promise = require('promise');


describe('login', function () {


    beforeEach(() => {
        return cleanup.cleanupDb();
    });


    it('should forward to costmanagement after successfull login', function () {
        browser.get(costManagementPage.getUrl());

        return login()
            .then(() =>
                browser.getCurrentUrl()
                    .then(url => expect(url).toEqual(costManagementPage.getUrl()))
            );
    });


    function login() {
        var inputEmail = loginPage.inputEmail().click()
            .then(() => loginPage.inputEmail().sendKeys('e2e@admin.ch'));
        var inputPassword = loginPage.inputPassword().click()
            .then(() => loginPage.inputPassword().sendKeys('pwd'));

        return Promise.all([inputEmail, inputPassword])
            .then(() => loginPage.loginButton().click());
    }
});