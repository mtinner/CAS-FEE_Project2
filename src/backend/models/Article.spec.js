'use strict';

var Article = require('./Article');


describe('Article', function () {
    it('has name', function () {
        var article = {id: 1, name: 'Super Cat', group: 'Alle'};
        expect(article.name).toEqual('Super Cat');
    });
    it('has group', function () {
        var article = {id: 1, name: 'Super Cat', group: 'Alle'};
        expect(article.group).toEqual('Alle');
    });
});