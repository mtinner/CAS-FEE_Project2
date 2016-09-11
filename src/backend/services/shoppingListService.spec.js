'use strict';

let shoppingListService = require('./shoppingListService');

describe('shoppingListService', ()=> {
    describe('getShoppingListGroups', ()=> {
        it('getShoppingListGroups size', ()=> {
            let shoppingListGroups = shoppingListService.getShoppingListGroups();
            expect(shoppingListGroups.groups.length).toBeGreaterThan(0);
        });
        it('getShoppingListGroups contains Alle', ()=> {
            let shoppingListGroups = shoppingListService.getShoppingListGroups();
            expect(shoppingListGroups.groups.some(obj=> {
                return obj.name === 'Alle';
            })).toBeTruthy();
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

    describe('deleteArticle', ()=> {
        it('delete Article has to be called', ()=> {
            spyOn(shoppingListService, 'deleteArticle');
            shoppingListService.deleteArticle({});
            expect(shoppingListService.deleteArticle).toHaveBeenCalled();
        });
    });
});