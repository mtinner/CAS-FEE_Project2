'use strict';
let NedbRepo = require('./NedbRepo');
let BaseService = require('./BaseService');

let singleton;

class ExpenseService extends BaseService {
    constructor() {
        super(new NedbRepo('expense'));
    }

    static get instance() {
        if(!this[singleton]) {
            this[singleton] = new ExpenseService();
        }
        return this[singleton];
    }
}

module.exports = ExpenseService;
