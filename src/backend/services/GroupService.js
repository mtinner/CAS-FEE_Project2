'use strict';
let NedbRepo = require('./NedbRepo');
let BaseService = require('./BaseService');

let singleton;

class GroupService extends BaseService {
    constructor() {
        super(new NedbRepo('group'));
    }

    static get instance() {
        if(!this[singleton]) {
            this[singleton] = new GroupService();
        }
        return this[singleton];
    }
}

module.exports = GroupService;
