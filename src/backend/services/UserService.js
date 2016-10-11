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
        return this.nedbRepo.get({email: user.email});
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

    addGroup(newDoc, user) {
        let dbUser = this.get(user);
        let dbGroup = this.groupService.add(new Group(undefined, newDoc.name));

        return Promise.all([dbUser, dbGroup])
            .then(values => {
                values[0].groups.push({id: values[1].id});
                return this.nedbRepo.update(values[0].id, values[0], {activeGroup: values[1].id});
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