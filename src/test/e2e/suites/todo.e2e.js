var dashboardPage = require('../core/pageobjects/dashboard');

describe('angularjs homepage todo list', function () {
    it('should add a todo', function () {
        browser.get(dashboardPage.getUrl());
        dashboardPage.heroNames().first().getText().then(function (text) {
            expect(text).toEqual('Narco');
        });
        expect(dashboardPage.title().getText().then(function (text) {
            expect(text).toEqual('Top Heroes');
        }));
        expect(dashboardPage.heroNames().count()).toEqual(4);
        expect(dashboardPage.heroes().count()).toEqual(4);
    });
});