'use strict';
let NedbRepo = require('./NedbRepo'),
    UserService = require('./UserService');

class ArticleService {
    constructor() {
        this.nedbRepo = new NedbRepo('article');
        this.userService = UserService.instance;
    }

    getAll(user) {
        return this.userService.get(user)
                this.nedbRepo.getAll({groupId: user.activeGroup})
            .then(user =>
            );
    }

    add(newDoc, user) {
        return this.userService.get(user)
                Object.assign(newDoc, {groupId: user.activeGroup});
            .then(user => {
                return this.nedbRepo.add(newDoc);
            });
    }

    remove(id) {
        return this.nedbRepo.remove(id);
    }
}

module.exports = ArticleService;