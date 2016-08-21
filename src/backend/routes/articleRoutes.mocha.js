'use strict';

let expect = require("chai").expect,
    request = require("request");

let url = "http://localhost:8080/api/shoppingList/article";


describe('/article', ()=> {

    describe('/GET', ()=> {

        it('respond with 200', (done)=> {
            request(url, (error, response)=> {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('respond id 0 with 200', (done)=> {
            request(`${url}/0`, (error, response)=> {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('/POST', ()=> {

        it('respond with 200', (done)=> {
            request.post(url, {name: 'Gurken', group: 'Alle'}, (error, response)=> {
                expect(response.statusCode).to.equal(201);
                done();
            });
        });

        it('POST respond with object', (done)=> {
            request.post({
                url: url,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({name: 'Gurken', group: 'Alle'})
            }, (error, response, body) => {
                let article = JSON.parse(body);
                expect(response.statusCode).to.equal(201);
                expect(article).to.be.a('object');
                expect(article.id).to.be.a('number');
                expect(article.name).to.be.a('string');
                expect(article.group).to.be.a('string');
                done();
            })
        });
    });

    describe('/PUT', ()=> {

        it('respond with 200', (done)=> {
            request.put(url, {name: 'Gurken', group: 'Alle'}, (error, response)=> {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('respond with new object', (done)=> {
            request.put({
                url: url,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({name: 'Gurken', group: 'Alle'})
            }, (error, response, body)=> {
                let article = JSON.parse(body);
                expect(response.statusCode).to.equal(200);
                expect(article).to.be.a('object');
                expect(article.id).to.be.a('number');
                expect(article.name).to.be.a('string');
                expect(article.group).to.be.a('string');
                done();
            })
        });

        it('respond with updated object', (done)=> {
            request.put({
                url: url,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({name: 'Gurken', group: 'Alle'})
            }, (error, response, body) => {
                let id = JSON.parse(body).id;

                request.put({
                    url: `${url}/${id}`,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({name: 'Gurken', group: 'Früchte'})
                }, (error, response, body) => {
                    let article = JSON.parse(body);
                    expect(response.statusCode).to.equal(200);
                    expect(article).to.be.a('object');
                    expect(article.id).to.be.a('number');
                    expect(article.id).to.equal(id);
                    expect(article.name).to.be.a('string');
                    expect(article.group).to.be.a('string');
                    done();
                })
            })
        });
    });

    describe('/DELETE', ()=> {

        it('respond with 404', (done)=> {
            request.delete(url, (error, response)=> {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('respond id 9999999999 with 404', (done)=> {
            request.delete(`${url}/9999999999`, (error, response)=> {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('respond with 204', (done)=> {

            request.post({
                url: url,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({name: 'Gurken', group: 'Alle'})
            }, (error, response, body) => {
                let article = JSON.parse(body);
                request.delete(`${url}/${article.id}`, (error, response)=> {
                    expect(response.statusCode).to.equal(204);
                    done();
                });
            });
        });

        it('respond id asdf with 404', (done)=> {
            request.delete(`${url}/asdf`, (error, response)=> {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });
});