'use strict';

let expect = require("chai").expect,
    request = require("request");

let url = "http://localhost:8080/api/shoppingList";


describe('/shoppingList', ()=> {
    it('GET respond with 200', (done)=> {
        request(`${url}/groupes`, (error, response, body)=> {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});