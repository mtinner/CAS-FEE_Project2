'use strict';
let Article = require('../models/Article');


let shoppingListService = (function () {
    let shoppingListGroups = {groups: [{name: 'Alle'}, {name: 'Früchte/Gemüse'}, {name: 'Milchwaren'}, {name: 'Fleisch'}, {name: 'Sonstiges'}, {name: 'Non Food'}]},
        id = 0,
        articles = [];

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

    function getArticle(id) {
        if (!Number.isInteger(parseInt(id))) {
            return articles;
        }
        id = parseInt(id);
        return articles.find(o=> {

            {
                return o.id === id;
            }
        })
    }

    function addArticle(article) {
        let a = new Article(
            id++,
            article.name,
            article.group
        );
        articles.push(a);
        return a;
    }

    function updateArticle(id, newArticle) {
        let oldArticle;
        if (Number.isInteger(parseInt(id))) {
            oldArticle = getArticle(id);
        }
        if (!newArticle) {
            throw new Exception('no new article');
        }
        else if (newArticle && !oldArticle) {
            return addArticle(newArticle);
        }
        return Object.assign(oldArticle, newArticle);
    }

    function deleteArticle(id) {
        let article = getArticle(id);

        if (!article || !Number.isInteger(article.id)) {
            throw new Exception('Article not found');
        }
        let pos = getPositionOfArticle(article);
        if (pos < 0) {
            throw new Exception('Position of article not found');
        }
        return articles.splice(pos, 1);
    }

    function getPositionOfArticle(article) {
        return articles.findIndex(a=>a.id === article.id);
    }
})();

module.exports = shoppingListService;