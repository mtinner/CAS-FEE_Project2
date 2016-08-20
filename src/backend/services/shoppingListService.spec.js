'use strict';

let shoppingListService = require('./shoppingListService');

describe('shoppingListService', ()=> {
    describe('getShoppingListGroupes', ()=> {
        it('getShoppingListGroupes size', ()=> {
            let shoppingListGroupes = shoppingListService.getShoppingListGroupes();
            expect(shoppingListGroupes.length).toBeGreaterThan(0);
        });
        it('getShoppingListGroupes contains Alle', ()=> {
            let shoppingListGroupes = shoppingListService.getShoppingListGroupes();
            expect(shoppingListGroupes).toContain('Alle');
        });
    });

    describe('getArticle', ()=> {
        it('get Article has to be called', ()=> {

            spyOn(shoppingListService, 'getArticle');
            shoppingListService.getArticle(0);
            expect(shoppingListService.getArticle).toHaveBeenCalled();
        });

    });

    describe('addArticle', ()=> {
        it('add Article has to be called', ()=> {
            spyOn(shoppingListService, 'addArticle');
            shoppingListService.addArticle({});
            expect(shoppingListService.addArticle).toHaveBeenCalled();
        });
    });

    describe('updateArticle', ()=> {
        it('update Article has to be called', ()=> {
            spyOn(shoppingListService, 'updateArticle');
            shoppingListService.updateArticle({});
            expect(shoppingListService.updateArticle).toHaveBeenCalled();
        });
    });
});