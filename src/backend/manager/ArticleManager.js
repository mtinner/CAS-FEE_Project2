'use strict';
let ArticleService = require('../services/ArticleService'),
    UserService = require('../services/UserService'),
    ResponseException = require('../models/ResponseException');

class ArticleManager {
    constructor() {
        this.articleService = ArticleService.instance;
        this.userService = UserService.instance;
    }

    getGroups() {
        return {
            articleGroups: [
                {id: 0, name: 'Alle'},
                {id: 1, name: 'Früchte/Gemüse'},
                {id: 2, name: 'Milchwaren'},
                {id: 3, name: 'Fleisch'},
                {id: 4, name: 'Sonstiges'},
                {id: 5, name: 'Non Food'}
            ]
        };
    }

    getAll(user) {
        return this.userService.get(user)
            .then(user => this.articleService.getAll({groupId: user.activeGroup})
                .then(articles => ({articles: articles})));
    }

    add(user, newDoc) {
        return this.userService.get(user)
            .then(user => {
                Object.assign(newDoc, {groupId: user.activeGroup});
                return this.articleService.add(newDoc);
            });
    }

    remove(user, id) {
        return this.userService.get(user)
            .then(dbUser => this.articleService.get({id: id})
                .then(article => {
                        if (article && dbUser.activeGroup === article.groupId) {
                            return this.articleService.remove(id);
                        }
                        else {
                            throw new ResponseException(404, 'User is not in group');
                        }
                    }
                )
            );
    }
}

module.exports = ArticleManager;