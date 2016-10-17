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

    getAll(user) {
        return this.nedbRepo.getAll(user);
    }

    getGroupMembers(groupId, user) {
        return this.get(user).then((user)=> {
            return this.hasGroup(user, groupId)
                .then((group)=> {
                    if (group) {
                        return this.nedbRepo.getAll({'groups.id': groupId})
                            .then((users) => {
                                return users;
                            });
                    } else {
                        return Promise.reject('Not allowed to get group members');
                    }
                });
        });
    }

    getGroups(user) {
        return this.get(user).then((user)=> {
            let promises = [];
            user.groups.forEach((group)=> {

                promises.push(this.groupService.get(group)
                    .then((group=> {
                        if (group.id === user.activeGroup) {
                            group.isActiveGroup = true;
                        }
                        else {
                            group.isActiveGroup = false;
                        }
                        return group;
                    })));

            });
            return Promise.all(promises)
                .then(values=> {
                    return {groups: values};
                });
        });
    }

    setActiveGroup(groupId, user) {
        return this.get(user).then((user)=> {
            return this.hasGroup(user, groupId)
                .then((group)=> {
                    if (group) {
                        return this.nedbRepo.update(user.id, user, {activeGroup: groupId})
                            .then((user) => {
                                return user;
                            });
                    } else {
                        return Promise.reject('Not allowed to change to this group');
                    }
                });
        });
    }

    joinGroup(invitedGroupId, memberUser, invitedUser) {
        if (!invitedGroupId || !memberUser || !invitedUser) {
            return Promise.reject('Invalid Parameter');
        }
        return this.get(memberUser)
            .then((user)=> {
                this.hasGroup(user, invitedGroupId)
                    .then(group=> {
                        if (group) {
                            return this.get(invitedUser)
                                .then(user=> {
                                    user.groups.push({id: invitedGroupId});
                                    return this.nedbRepo.update(user.id, user, {})
                                        .then(() => {
                                        });
                                });
                        } else {
                            return Promise.reject('Not allowed to join');
                        }
                    });
            });
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

    hasGroup(user, groupId) {
        return Promise.resolve(user.groups.find(group=> group.id === groupId));
    }
}

module.exports = UserService;