'use strict';
let ExpenseService = require('../services/ExpenseService'),
    UserService = require('../services/UserService');

class ExpenseManager {
    constructor() {
        this.expenseService = ExpenseService.instance;
        this.userService = UserService.instance;
    }

    getAll(user, year, month) {
        return this.expenseService.getAll({ year: year, month: month })
            .then(expenses => ({ expenses: expenses }));
    }

    add(newDoc) {
        return this.expenseService.add(newDoc);
    }

    remove(id) {
        return this.expenseService.remove(id);
    }
}

module.exports = ExpenseManager;