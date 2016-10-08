'use strict';

let shoppingListService = require('./shoppingListService');

describe('shoppingListService', ()=> {
    describe('getArticleGroups', ()=> {
        it('getArticleGroups size', ()=> {
            let articleGroups = shoppingListService.getArticleGroups();
            expect(articleGroups.articleGroups.length).toBeGreaterThan(0);
        });
        it('getArticleGroups contains Alle', ()=> {
            let articleGroups = shoppingListService.getArticleGroups();
            expect(articleGroups.articleGroups.some(obj=> {
                return obj.name === 'Alle';
            })).toBeTruthy();
        });
    });

    describe('deleteArticle', ()=> {
        it('delete Article has to be called', ()=> {
            spyOn(shoppingListService, 'deleteArticle');
            shoppingListService.deleteArticle({});
            expect(shoppingListService.deleteArticle).toHaveBeenCalled();
        });
    });
});