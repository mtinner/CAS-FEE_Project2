'use strict';
let Article = require('../models/Article');


let shoppingListService = (function () {
    let shoppingListGroups = {
            groups: [
                {id: 0, name: 'Alle'},
                {id: 1, name: 'Früchte/Gemüse'},
                {id: 2, name: 'Milchwaren'},
                {id: 3, name: 'Fleisch'},
                {id: 4, name: 'Sonstiges'},
                {id: 5, name: 'Non Food'}
            ]
        },
        id = 0,
        articles = [new Article(0, 'Milch', 2), new Article(1, 'Bananen', 1), new Article(2, 'Rüebli', 1), new Article(3, 'Äpfel', 1)];

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
            return {articles: articles};
        }
        id = parseInt(id);
        return articles.find(o=> {

            {
                return o.id === id;
            }
        });
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
            throw new Error('no new article');
        }
        else if (newArticle && !oldArticle) {
            return addArticle(newArticle);
        }
        return Object.assign(oldArticle, newArticle);
    }

    function deleteArticle(id) {
        let article = getArticle(id);

        if (!article || !Number.isInteger(article.id)) {
            throw new Error('Article not found');
        }
        let pos = getPositionOfArticle(article);
        if (pos < 0) {
            throw new Error('Position of article not found');
        }
        return articles.splice(pos, 1)[0];
    }

    function getPositionOfArticle(article) {
        return articles.findIndex(a=>a.id === article.id);
    }
})();

module.exports = shoppingListService;