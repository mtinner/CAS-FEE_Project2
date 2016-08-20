'use strict';
let Article = require('../models/Article');


let shoppingListService = (function () {
    let shoppingListGroupes = ['Alle', 'Früche/Gemüse', 'Fleisch', 'Food', 'Non Food'],
        id = 0,
        articles = [];

    return {
        getShoppingListGroupes: getShoppingListGroupes,
        getArticle: getArticle,
        addArticle: addArticle,
        updateArticle: updateArticle
    };

    function getShoppingListGroupes() {
        return shoppingListGroupes;
    }

    function getArticle(id) {
        id = parseInt(id);
        return articles.find(o=> {
            o.id === id;
        })
    }

    function addArticle(article) {
        let a = new Article(
            id++,
            article.name,
            article.group
        );
        articles.push(article);
        return a;
    }

    function updateArticle(id, newArticle) {
        let oldArticle = getArticle(id);
        if (!newArticle || !oldArticle) {
            throw new Exception('new and old article expected');
        }
        return Object.assign(oldArticle, newArticle);
    }
})();

module.exports = shoppingListService;