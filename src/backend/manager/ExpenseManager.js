'use strict';
let Promise = require('promise'),
    ExpenseService = require('../services/ExpenseService'),
    UserService = require('../services/UserService');

class ExpenseManager {
    constructor() {
        this.expenseService = ExpenseService.instance;
        this.userService = UserService.instance;
    }

    getAll(user, year, month) {
        return this.expenseService.getAll({ year: year, month: month })
            .then(expenses => {
                let promises = [];
                for (let expenseIndex in expenses) {
                    for (let debitorIndex in expenses[expenseIndex].debitors) {
                        promises.push(this.userService.getById(expenses[expenseIndex].debitors[debitorIndex])
                            .then(user => {
                                expenses[expenseIndex].debitors[debitorIndex] = this.secureUser(user);
                            }));
                    }
                }
                return Promise.all(promises).then(() => ({expenses: expenses}) );
            });
    }

    add(newDoc, userId) {
        return this.expenseService.add(Object.assign(newDoc, { creditor: userId }));
    }

    remove(id) {
        return this.expenseService.remove(id);
    }

    secureUser(user) {
        return { id: user.id, email: user.email, username: user.username };
    }
}

module.exports = ExpenseManager;