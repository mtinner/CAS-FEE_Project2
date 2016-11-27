'use strict';

let Expense = function (id, name, year, month, day, creditor, debitors) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.month = month;
    this.day = day;
    this.creditor = creditor;
    this.debitors = debitors;
};

module.exports = Expense;