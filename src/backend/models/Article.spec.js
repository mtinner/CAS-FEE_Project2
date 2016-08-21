'use strict';

let Article = require('./Article');


describe('Article', ()=> {
    it('has id', ()=> {
        let article = new Article(1, 'Super Cat', 'Alle');
        expect(article.id).toEqual(1);
    });
    it('has name', ()=> {
        let article = new Article(1, 'Super Cat', 'Alle');
        expect(article.name).toEqual('Super Cat');
    });
    it('has group', ()=> {
        let article = new Article(1, 'Super Cat', 'Alle');
        expect(article.group).toEqual('Alle');
    });
});