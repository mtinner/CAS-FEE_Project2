'use strict';
let NedbRepo = require('./NedbRepo'),
    GroupService = require('./GroupService'),
    Group = require('../models/Group'),
    Promise = require('promise');

let singleton;

class UserService {
    constructor() {
        this.groupService = GroupService.instance;
        this.nedbRepo = new NedbRepo('user');
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new UserService();
        }
        return this[singleton];
    }

    get(user) {
        return this.nedbRepo.get(user);
    }

    getGroups(user) {
        return this.get(user).then((user)=> {
            let promises = [];
            user.groups.forEach((group)=> {
                promises.push(this.groupService.get(group));

            });
            return Promise.all([...promises])
                .then(values=> {
                    return {groups: values};
                });
        });
    }

    add(newDoc) {
        return this.groupService.add(new Group(undefined, 'Private'))
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