'use strict';

let expect = require("chai").expect,
    request = require("request");

let url = "http://localhost:8080/api/shoppingList/article";


describe('GET /article', function () {

    it('respond with 200', function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});