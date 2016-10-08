'use strict';

let Article = function (id, name, articleGroup) {
    this.id = id;
    this.name = name;
    this.articleGroup = articleGroup;
};

module.exports = Article;