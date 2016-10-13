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

                promises.push(this.groupService.get(group)
                    .then((group=> {
                    if (group.id === user.activeGroup) {
                        group.activeGroup = true;
                    }
                    else {
                        group.activeGroup = false;
                    }
                    return group;
                })));

            });
            return Promise.all([...promises])
                .then(values=> {
                    return {groups: values};
                });
        });
    }

    joinGroup(invitedGroupId, memberUser, invitedUser) {
        if (!invitedGroupId || !memberUser || !invitedUser) {
            return Promise.reject('Invalid Parameter');
        }
        return this.get(memberUser)
            .then(hasGroup)
            .then(user=> {
                if (user) {
                    return this.get(invitedUser)
                        .then(user=> {
                            user.groups.push({id: invitedGroupId});
                            return this.nedbRepo.update(user.id, user, {})
                                .then(() => {
                                    return;
                                });
                        });
                } else {
                    return Promise.reject('Not allowed to join');
                }
            });

        function hasGroup(user) {
            return Promise.resolve(user.groups.find(group=> group.id === invitedGroupId));
        }
    }

    addGroup(newDoc, user) {
        let dbUser = this.get(user);
        let dbGroup = this.groupService.add(new Group(undefined, newDoc.name));

        return Promise.all([dbUser, dbGroup])
            .then(values => {
                values[0].groups.push({id: values[1].id});
                return this.nedbRepo.update(values[0].id, values[0], {activeGroup: values[1].id})
                    .then(()=>values[1]);
            });
    }

    add(newDoc) {
        return this.nedbRepo.add(Object.assign(newDoc, {activeGroup: -1, groups: [], roles: ['user']}))
            .then(user=>this.addGroup({name: 'Private'}, user));
    }
}

module.exports = UserService;