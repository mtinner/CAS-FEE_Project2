'use strict';
let NedbRepo = require('./NedbRepo');
let BaseService = require('./BaseService');

let singleton;

class ArticleService extends BaseService{
    constructor() {
        super(new NedbRepo('article'));
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ArticleService();
        }
        return this[singleton];
    }
}

module.exports = ArticleService;
