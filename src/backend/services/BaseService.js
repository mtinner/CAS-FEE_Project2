'use strict';

class BaseService {
    constructor(nedbRepo) {
        this.nedbRepo = nedbRepo;
    }

    get(document) {
        return this.nedbRepo.get(document);
    }

    getAll(document) {
        return this.nedbRepo.getAll(document);
    }

    add(newDoc) {
        return this.nedbRepo.add(newDoc);
    }

    remove(id) {
        return this.nedbRepo.remove(id);
    }

    update(id, oldDoc, newDoc) {
        return this.nedbRepo.update(id, oldDoc, newDoc);
    }
}

module.exports = BaseService;
