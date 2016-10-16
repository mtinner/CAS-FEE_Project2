'use strict';
let NedbRepo = require('./NedbRepo');

let singleton;

class GroupService {
    constructor() {
        this.nedbRepo = new NedbRepo('group');
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new GroupService();
        }
        return this[singleton];
    }

    get(group) {
        return this.nedbRepo.get(group);
    }

    add(newDoc) {
        return this.nedbRepo.add(newDoc);
    }
}

module.exports = GroupService;