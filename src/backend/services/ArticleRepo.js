'use strict';
let NedbRepo = require ('./NedbRepo');

class ArticleRepo{
    constructor(){
        this.nedbRepo = new NedbRepo('article');
    }

    get(id) {
        return this.nedbRepo.get(id);
    }

    add(newDoc) {
        return this.nedbRepo.add(newDoc);
    }
    find(obj) {
        return this.nedbRepo.find(obj);
    }

    update(id, oldDoc, newDoc) {
        return this.nedbRepo.update(id,oldDoc,newDoc);
    }

    remove(id) {
        return this.remove(id);
    }
}

module.exports = ArticleRepo;