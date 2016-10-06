'use strict';
let Article = require('../models/Article');
let NedbRepo = require ('./NedbRepo');

let shoppingListService = (function () {
    let nedbRepo = new NedbRepo(),
     articleGroups = {
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
        getArticleGroups: getArticleGroups,
        getArticle: getArticle,
        addArticle: addArticle,
        updateArticle: updateArticle,
        deleteArticle: deleteArticle
    };

    function getArticleGroups() {
        return articleGroups;
    }

    function getArticle(id) {
        return nedbRepo.get(id).then(articles => {
            if (Array.isArray(articles)) {
                return { articles: articles.map(a => new Article(a.id, a.name, a.group)) };
            } else {
                return new Article(articles.id, articles.name, articles.group);
            }
        });
    }

    function addArticle(article) {
        return nedbRepo.add(article);
    }

    function updateArticle(id, newArticle) {
        return nedbRepo.update(id, newArticle);
    }

    function deleteArticle(id) {
        return nedbRepo.remove(id);
    }
})();

module.exports = shoppingListService;