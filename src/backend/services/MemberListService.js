'use strict';
let NedbRepo = require ('./NedbRepo');

class UserService{
    constructor(){
        this.nedbRepo = new NedbRepo('memberList');
    }

    get(id) {
        //TODO get userGroup and so on
        return this.nedbRepo.get(id);
    }

    add(newDoc) {
        //TODO get userGroup and so on
        return this.nedbRepo.add(newDoc);
    }

    remove(id) {
        //TODO get userGroup and so on
        return this.nedbRepo.remove(id);
    }
}

module.exports = UserService;