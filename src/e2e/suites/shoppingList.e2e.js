var loginPage = require('../pageobjects/login');
var shopplingListPage = require('../pageobjects/shopplingList');
var cleanup = require('../cleanup');
var Promise = require('promise');


describe('login', function () {

    beforeEach(() => {
        return cleanup.cleanupDb()
            .then(login);
    });


    it('should add Article', function () {
        const enteredText = 'Add?';
        return shopplingListPage.getFirstAddInput().sendKeys(enteredText)
            .then(() => shopplingListPage.getFirstAddInput().sendKeys(protractor.Key.ENTER)
                .then(() => expect(shopplingListPage.getFirstChip().getText()).toBe(enteredText)
                )
            );
    });

    it('should delete Article', function () {
        const enteredText = 'Delete?';
        return shopplingListPage.getFirstAddInput().sendKeys(enteredText)
            .then(() => shopplingListPage.getFirstAddInput().sendKeys(protractor.Key.ENTER)
                .then(() => shopplingListPage.getFirstDeleteChip().click()
                    .then(() => expect(shopplingListPage.getChips().count()).toBe(0))
                )
            );
    });

    function login() {
        browser.get(loginPage.getUrl());
        var inputEmail = loginPage.inputEmail().click()
            .then(() => loginPage.inputEmail().sendKeys('e2e@admin.ch'));
        var inputPassword = loginPage.inputPassword().click()
            .then(() => loginPage.inputPassword().sendKeys('pwd'));

        return Promise.all([inputEmail, inputPassword])
            .then(() => loginPage.loginButton().click());
    }
});