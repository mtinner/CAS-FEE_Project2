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
        getArticles: getArticles,
        addArticle: addArticle,
        deleteArticle: deleteArticle
    };

    function getArticleGroups() {
        return articleGroups;
    }

    function getArticles(user) {
        return articleService.get(user).then(articles => {
            if (Array.isArray(articles)) {
                return { articles: articles.map(a => new Article(a.id, a.name, a.group)) };
            } else {
                return [];
            }
        });
    }

    function addArticle(article,user) {
        return articleService.add(article,user);
    }

    function deleteArticle(id) {
        return articleService.remove(id);
    }
})();

module.exports = shoppingListService;