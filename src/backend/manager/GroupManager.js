'use strict';
let Promise = require('promise'),
    Group = require('../models/Group'),
    GroupService = require('../services/GroupService'),
    UserService = require('../services/UserService');

class GroupManager {
    constructor() {
        this.groupService = GroupService.instance;
        this.userService = UserService.instance;
    }

    getAll(user) {
        return this.userService.get(user)
            .then((user)=> {
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

    add(newDoc, user) {
        let dbUser = this.userService.get(user);
        let dbGroup = this.groupService.add(new Group(undefined, newDoc.name));

        return Promise.all([dbUser, dbGroup])
            .then(values => {
                values[0].groups.push({id: values[1].id});
                return this.userService.update(values[0].id, values[0], {activeGroup: values[1].id})
                    .then(()=>values[1]);
            });
    }

    join(invitedGroupId, memberUser, invitedUser) {
        if (!invitedGroupId || !memberUser || !invitedUser) {
            return Promise.reject('Invalid Parameter');
        }
        return this.userService.get(memberUser)
            .then((user)=> {
                return this.hasGroup(user, invitedGroupId)
                    .then(group=> {
                        if (group) {
                            return this.userService.get(invitedUser)
                                .then(user=> {
                                    user.groups.push({id: invitedGroupId});
                                    return this.userService.update(user.id, user, {})
                                        .then(this.secureUser);
                                });
                        } else {
                            return Promise.reject('Not allowed to join');
                        }
                    });
            });
    }

    setActive(groupId, user) {
        return this.userService.get(user)
            .then((user)=> {
                return this.hasGroup(user, groupId)
                    .then((group)=> {
                        if (group) {
                            return this.userService.update(user.id, user, {activeGroup: groupId})
                                .then(this.secureUser(user));
                        } else {
                            return Promise.reject('Not allowed to change to this group');
                        }
                    });
            });
    }

    getMembers(groupId, user) {
        return this.userService.get(user)
            .then((user) => {
                return this.hasGroup(user, groupId)
                    .then((group) => {
                        if (group) {
                            return this.userService.getAll({'groups.id': groupId})
                                .then((users) => {
                                    let members = users.map(this.secureUser);
                                    return {members: members};
                                });
                        } else {
                            return Promise.reject('Not allowed to get group members');
                        }
                    });
            });
    }

    hasGroup(user, groupId) {
        return Promise.resolve(user.groups.find(group=> group.id === groupId));
    }

    secureUser(user) {
        return {email: user.email, username: user.username};
    }

    leave(groupId, user) {
        return this.userService.get(user)
            .then((dbUser)=> this.hasGroup(dbUser, groupId)
                .then((hasGroup)=> {
                    if (!hasGroup) {
                        return;
                    }
                    let remainingGroups = dbUser.groups.filter((group) => group.id !== groupId);
                    // TODO delete Group if no members?

                    return this.userService.update(dbUser.id, dbUser, {
                        activeGroup: this.evaluateActiveGroup(dbUser, groupId, remainingGroups),
                        groups: remainingGroups
                    });
                }));

    }

    evaluateActiveGroup(dbUser, groupId, remainingGroups) {
        let newActiveGroup;
        if (dbUser.activeGroup !== groupId) {
            newActiveGroup = dbUser.activeGroup;
        }
        else {
            if (remainingGroups.length) {
                newActiveGroup = remainingGroups[0].id;
            }
            else {
                newActiveGroup = '';
            }
        }
        return newActiveGroup;
    }
}

module.exports = GroupManager;