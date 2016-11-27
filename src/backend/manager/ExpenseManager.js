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
        return this.userService.get(user)
            .then((user) => {
                return this.expenseService.getAll({ groupId: user.activeGroup, year: year, month: month })
                    .then(expenses => {
                        let promises = [];
                        for (let expenseIndex in expenses) {
                            for (let debitorIndex in expenses[expenseIndex].debitors) {
                                promises.push(this.userService.get({ email: expenses[expenseIndex].debitors[debitorIndex] })
                                    .then(user => {
                                        expenses[expenseIndex].debitors[debitorIndex] = this.secureUser(user);
                                    }));
                            }
                            promises.push(this.userService.get({ email: expenses[expenseIndex].creditor })
                                .then(user => {
                                    expenses[expenseIndex].creditor = this.secureUser(user);
                                }));
                        }
                        return Promise.all(promises).then(() => ({ expenses: expenses }));
                    });
            });
    }

    add(newDoc, user) {
        return this.userService.get(user)
            .then((user) => {
                return this.expenseService.add(Object.assign(newDoc, { creditor: user.email }, { groupId: user.activeGroup }));
            });
    }

    remove(id) {
        return this.expenseService.remove(id);
    }

    secureUser(user) {
        return { email: user.email, username: user.username };
    }
}

module.exports = ExpenseManager;