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
            .then(user => this.nedbRepo.getAll({groupId: user.activeGroup}));
    }

    add(newDoc, user) {
        return this.userService.get(user)
            .then(user => {
                Object.assign(newDoc, {groupId: user.activeGroup});
                return this.nedbRepo.add(newDoc);
            });
    }

    remove(id) {
        return this.nedbRepo.remove(id);
    }
}

module.exports = ArticleService;