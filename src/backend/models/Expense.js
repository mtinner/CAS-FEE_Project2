'use strict';

let Expense = function (id, name, creditor, debitors) {
    this.id = id;
    this.name = name;
    this.creditor = creditor;
    this.debitors = debitors;
};

module.exports = Expense;