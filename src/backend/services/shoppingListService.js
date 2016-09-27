'use strict';
let Article = require('../models/Article'),
    articleRepo = require('./nedbRepo')('article');

let shoppingListService = (function () {
    let shoppingListGroups = {
        groups: [
            { id: 0, name: 'Alle' },
            { id: 1, name: 'Früchte/Gemüse' },
            { id: 2, name: 'Milchwaren' },
            { id: 3, name: 'Fleisch' },
            { id: 4, name: 'Sonstiges' },
            { id: 5, name: 'Non Food' }
        ]
    };

    return {
        getShoppingListGroups: getShoppingListGroups,
        getArticle: getArticle,
        addArticle: addArticle,
        updateArticle: updateArticle,
        deleteArticle: deleteArticle
    };

    function getShoppingListGroups() {
        return shoppingListGroups;
    }

    function getArticle(id, callback) {
        articleRepo.get(id, article => {
            if (Array.isArray(article)) {
                callback({ 
                    articles: article.map(a => new Article(a.id, a.name, a.group)) 
                });
            } else {
                callback(new Article(article.id, article.name, article.group));
            }
        });
    }

    function addArticle(article, callback) {
        articleRepo.add(article, callback);
    }

    function updateArticle(id, newArticle, callback) {
        articleRepo.update(id, newArticle, callback);
    }

    function deleteArticle(id, callback) {
        articleRepo.remove(id, callback);
    }
})();

module.exports = shoppingListService;