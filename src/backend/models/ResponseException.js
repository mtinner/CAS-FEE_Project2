'use strict';

let ResponseException = function (status, message) {
    this.status = status;
    this.message = message;
};

module.exports = ResponseException;