'use strict';
let Article = require('../models/Article'),
    ArticleRepo = require('./ArticleRepo');


let shoppingListService = (function () {
    let articleRepo = new ArticleRepo(),
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
        return articleRepo.get(id).then(articles => {
            if (Array.isArray(articles)) {
                return { articles: articles.map(a => new Article(a.id, a.name, a.group)) };
            } else {
                return new Article(articles.id, articles.name, articles.group);
            }
        });
    }

    function addArticle(article) {
        return articleRepo.add(article);
    }

    function updateArticle(id, newArticle) {
        return articleRepo.update(id, newArticle);
    }

    function deleteArticle(id) {
        return articleRepo.remove(id);
    }
})();

module.exports = shoppingListService;