'use strict';

let CustomException = function (status, message) {
    this.status = status;
    this.message = message;
};

module.exports = CustomException;