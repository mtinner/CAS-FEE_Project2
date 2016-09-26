'use strict';
let Article = require('../models/Article'),
    Datastore = require('nedb');

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
    },
        id = 0,
        articles = new Datastore({ filename: 'articles.db', autoload: true });

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
        if (id) {
            articles.findOne({ _id: id }, (err, doc) => {
                doc.id = doc._id;
                callback(doc);
            });
        } else {
            articles.find({}, (err, docs) => {
                docs.forEach(a => a.id = a._id);
                var arr = { articles: docs };
                callback(arr);
            });
        }
    }

    function addArticle(article, callback) {
        let a = new Article(
            0,
            article.name,
            article.group
        );
        articles.insert(a, (err, doc) => {
            doc.id = doc._id;
            callback(doc);
        });
    }

    function updateArticle(id, newArticle, callback) {
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
        return articles.update(Object.assign(oldArticle, newArticle), (err, doc => {
            doc.id = doc._id;
            callback(doc);
        }));
    }

    function deleteArticle(id, callback) {
        getArticle(id, article => {
            if (!article || !article.id) {
                throw new Error('Article not found');
            }
            articles.remove({ _id: article.id }, () => {
                callback(article);
            });
        });
    }
})();

module.exports = shoppingListService;