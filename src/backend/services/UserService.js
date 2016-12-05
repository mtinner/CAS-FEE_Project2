'use strict';
let NedbRepo = require('./NedbRepo');
let BaseService = require('./BaseService');

let singleton;

class UserService extends BaseService{
    constructor() {
        super(new NedbRepo('user'));
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new UserService();
        }
        return this[singleton];
    }

    get(user) {
        return super.get({email: user.email});
    }

    getFromProto(user) {
        return super.get(user);
    }
}

module.exports = UserService;
