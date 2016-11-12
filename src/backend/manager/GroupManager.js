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

    get(groupId, user) {
        return this.checkGroupPermission(user, groupId)
            .then(hasGroup => {
                if (!hasGroup) {
                    return Promise.reject('Invalid Parameter');
                }
                else {
                    return this.groupService.get({id: groupId});
                }
            });
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

    join(groupId, memberUser, invitedUser) {
        if (!groupId || !memberUser || !invitedUser) {
            return Promise.reject('Invalid Parameter');
        }
        return this.checkGroupPermission(memberUser, groupId)
            .then(group=> {
                if (group) {
                    return this.userService.get(invitedUser)
                        .then(user=> {
                            user.groups.push({id: groupId});
                            return this.userService.update(user.id, user, {})
                                .then(this.secureUser);
                        });
                } else {
                    return Promise.reject('Not allowed to join');
                }
            });
    }

    setActive(groupId, user) {
        return this.checkGroupPermission(user, groupId)
            .then((group)=> {
                if (group) {
                    return this.userService.get(user)
                        .then(user =>
                            this.userService.update(user.id, user, {activeGroup: groupId})
                                .then(this.secureUser(user)));
                } else {
                    return Promise.reject('Not allowed to change to this group');
                }
            });
    }

    getMembers(groupId, user) {
        return this.checkGroupPermission(user, groupId)
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
    }

    rename(groupId, user, group) {
        return this.checkGroupPermission(user, groupId)
            .then((dbGroup) => {
                if (dbGroup && group.name) {
                    return this.groupService.update(groupId, {id: groupId}, {name: group.name});
                } else {
                    return Promise.reject('Not allowed to rename this group');
                }
            });
    }

    checkGroupPermission(user, groupId) {
        return this.userService.get(user)
            .then((user) => this.hasGroup(user, groupId));
    }

    getCurrentMembers(user) {
        return this.userService.get(user)
            .then((user) => {
                return this.hasGroup(user, user.activeGroup)
                    .then((group) => {
                        if (group) {
                            return this.userService.getAll({'groups.id': user.activeGroup})
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

    leave(groupId, triggeredUser, affecteUser) {
        let dbAffectedUser;
        let triggeredUserHasGroup = this.userService.get(triggeredUser)
            .then(dbUser=> this.hasGroup(dbUser, groupId));
        let affectedUserHasGroup = this.userService.get(affecteUser)
            .then(dbUser=> {
                dbAffectedUser = dbUser;
                return this.hasGroup(dbUser, groupId);
            });

        return Promise.all([triggeredUserHasGroup, affectedUserHasGroup])
            .then((hasGroup)=> {
                if (!hasGroup[0] || !hasGroup[1]) {
                    return;
                }
                let remainingGroups = dbAffectedUser.groups.filter((group) => group.id !== groupId);

                return this.userService.update(dbAffectedUser.id, dbAffectedUser, {
                    activeGroup: this.evaluateActiveGroup(dbAffectedUser, groupId, remainingGroups),
                    groups: remainingGroups
                });
            });

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