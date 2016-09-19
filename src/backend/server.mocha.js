'use strict';

let expect = require('chai').expect,
    request = require('request');

let url = 'http://localhost:8080';


describe('/index', () => {

    it('GET respond with 200', (done) => {
        request(url, (error, response) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});