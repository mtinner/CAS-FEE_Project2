'use strict';
let NedbRepo = require('./NedbRepo');

let singleton;

class UserService {
    constructor() {
        this.nedbRepo = new NedbRepo('user');
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new UserService();
        }
        return this[singleton];
    }

    get(user) {
        return this.nedbRepo.get({email: user.email});
    }

    getAll(user) {
        return this.nedbRepo.getAll(user);
    }

    update(id, oldDoc, newDoc) {
        return this.nedbRepo.update(id, oldDoc, newDoc);
    }

    add(newDoc) {
        return this.nedbRepo.add(newDoc);
    }

}

module.exports = UserService;