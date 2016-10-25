'use strict';
let ArticleService = require('../services/ArticleService'),
    UserService = require('../services/UserService');

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
                .then(articles=> ({articles: articles})));
    }

    add(newDoc, user) {
        return this.userService.get(user)
            .then(user => {
                Object.assign(newDoc, {groupId: user.activeGroup});
                return this.articleService.add(newDoc);
            });
    }

    remove(id) {
        return this.articleService.remove(id);
    }
}

module.exports = ArticleManager;