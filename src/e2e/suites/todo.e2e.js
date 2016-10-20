var dashboardPage = require('../pageobjects/dashboard');
var cleanup = require('../cleanup');


describe('angularjs homepage todo list', function () {

    afterEach(() => {
        cleanup.removeDB();
    });

    it('should add a todo', function () {
        browser.get(dashboardPage.getUrl());
        /* dashboardPage.heroNames().first().getText().then(function (text) {
         expect(text).toEqual('Narco');
         });
         expect(dashboardPage.title().getText().then(function (text) {
         expect(text).toEqual('Top Heroes');
         }));
         expect(dashboardPage.heroes().count()).toEqual(4);*/
    });
});