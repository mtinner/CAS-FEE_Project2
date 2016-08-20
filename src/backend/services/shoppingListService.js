'use strict';

const shoppingListService = (function () {
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
        return articles.find(article=>article.id === id)
    }

    function addArticle(article) {
        let article = new Article(
            id++,
            article.name,
            article.goup
        );
        articles.push(article);
        return article;
    }

    function updateArticle(id, newArticle) {
        var oldArticle = getArticle(id);
        if (!newArticle || !oldArticle) {
            throw new Exception('new and old article expected');
        }
        return Object.assign(oldArticle, newArticle);
    }

})();

module.exports = shoppingListService;