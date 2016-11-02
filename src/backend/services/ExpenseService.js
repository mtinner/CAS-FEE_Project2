'use strict';
let NedbRepo = require('./NedbRepo');

let singleton;

class ExpenseService {
    constructor() {
        this.nedbRepo = new NedbRepo('expense');
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ExpenseService();
        }
        return this[singleton];
    }

    getAll(expense) {
        return this.nedbRepo.getAll(expense);
    }

    add(newDoc, userId) {
        return this.nedbRepo.add(Object.assign(newDoc, {userId: userId}));
    }

    remove(id) {
        return this.nedbRepo.remove(id);
    }
}

module.exports = ExpenseService;