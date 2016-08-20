'use strict';

import {Article} from './Article';


describe('Article', ()=> {
    it('has name', ()=> {
        var article = {id: 1, name: 'Super Cat', group: 'Alle'};
        expect(article.name).toEqual('Super Cat');
    });
    it('has group', ()=> {
        var article = {id: 1, name: 'Super Cat', group: 'Alle'};
        expect(article.group).toEqual('Alle');
    });
});