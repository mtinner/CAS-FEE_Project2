'use strict';
let NedbRepo = require('./NedbRepo'),
    GroupService = require('./GroupService');
let singleton;

class UserService {
    constructor() {
        this.groupService = new GroupService();
        this.nedbRepo = new NedbRepo('user');
    }

    static get instance(){
        if(!this[singleton]){
            this[singleton] = new UserService();
        }
        return this[singleton];
    }

    get(user) {
        return this.nedbRepo.get(user);
    }

    add(newDoc) {
        return this.groupService.add({name: 'Private'})
            .then(resp=> {
                Object.assign(newDoc, {activeGroup: resp.id, groups: [{id: resp.id}], roles: ['user']});
                return this.nedbRepo.add(newDoc);
            });
    }

    remove(id) {
        //TODO get userGroup and so on
        return this.nedbRepo.remove(id);
    }
}

module.exports = UserService;