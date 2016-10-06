'use strict';
let Article = require('../models/Article'),
    ArticleService = require('./ArticleService');


let shoppingListService = (function () {
    let articleService = new ArticleService(),
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
        deleteArticle: deleteArticle
    };

    function getArticleGroups() {
        return articleGroups;
    }

    function getArticle(id) {
        return articleService.get(id).then(articles => {
            if (Array.isArray(articles)) {
                return { articles: articles.map(a => new Article(a.id, a.name, a.group)) };
            } else {
                return new Article(articles.id, articles.name, articles.group);
            }
        });
    }

    function addArticle(article) {
        return articleService.add(article);
    }

    function deleteArticle(id) {
        return articleService.remove(id);
    }
})();

module.exports = shoppingListService;