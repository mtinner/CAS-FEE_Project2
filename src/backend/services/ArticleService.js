'use strict';
let NedbRepo = require('./NedbRepo');

class ArticleService {
    constructor() {
        this.nedbRepo = new NedbRepo('article');
    }

    getAll(user) {
        let obj = {groupId:user.activeGroup};
        return this.nedbRepo.getAll(obj);
    }

    add(newDoc,user) {
        Object.assign(newDoc,{groupId:user.activeGroup});
        return this.nedbRepo.add(newDoc);
    }

    remove(id) {
        return this.nedbRepo.remove(id);
    }
}

module.exports = ArticleService;