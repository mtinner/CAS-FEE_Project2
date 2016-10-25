'use strict';
let NedbRepo = require('./NedbRepo');

let singleton;

class ArticleService {
    constructor() {
        this.nedbRepo = new NedbRepo('article');
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ArticleService();
        }
        return this[singleton];
    }

    getAll(article) {
        return this.nedbRepo.getAll(article);
    }

    add(newDoc) {
        return this.nedbRepo.add(newDoc);
    }

    remove(id) {
        return this.nedbRepo.remove(id);
    }
}

module.exports = ArticleService;