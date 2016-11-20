'use strict';
let Promise = require('promise'),
    Group = require('../models/Group'),
    GroupService = require('../services/GroupService'),
    UserService = require('../services/UserService'),
    ResponseException = require('../models/ResponseException');

class GroupManager {
    constructor() {
        this.groupService = GroupService.instance;
        this.userService = UserService.instance;
    }

    get(groupId, user) {
        return this.checkGroupPermission(user, groupId)
            .then(hasGroup => {
                if (!hasGroup) {
                    throw new ResponseException(404, 'User is not in group');
                }
                else {
                    return this.groupService.get({ id: groupId });
                }
            });
    }

    getAll(user) {
        return this.userService.get(user)
            .then((user) => {
                let promises = [];
                user.groups.forEach((group) => {

                    promises.push(this.groupService.get(group)
                        .then((group => {
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
                    .then(values => {
                        return { groups: values };
                    });
            });
    }

    add(newDoc, user) {
        let dbUser = this.userService.get(user);
        let dbGroup = this.groupService.add(new Group(undefined, newDoc.name));

        return Promise.all([dbUser, dbGroup])
            .then(values => {
                values[0].groups.push({ id: values[1].id });
                return this.userService.update(values[0].id, values[0], { activeGroup: values[1].id })
                    .then(() => values[1]);
            });
    }

    join(groupId, memberUser, invitedUser) {
        if (!groupId || !memberUser || !invitedUser) {
            throw new ResponseException(400, 'missing parameter');
        }
        return this.checkGroupPermission(memberUser, groupId)
            .then(group => {
                if (group) {
                    return this.userService.get(invitedUser)
                        .then(user => {
                            if (!user) {
                                throw new ResponseException(422, 'Email does not exist');
                            }
                            user.groups.push({ id: groupId });
                            return this.userService.update(user.id, user, {})
                                .then(this.secureUser);
                        });
                } else {
                    throw new ResponseException(404, 'User is not in group');
                }
            });
    }

    setActive(groupId, user) {
        return this.checkGroupPermission(user, groupId)
            .then((group) => {
                if (group) {
                    return this.userService.get(user)
                        .then(user =>
                            this.userService.update(user.id, user, { activeGroup: groupId })
                                .then(this.secureUser(user)));
                } else {
                    throw new ResponseException(404, 'User is not in group');
                }
            });
    }

    getMembers(groupId, user) {
        return this.checkGroupPermission(user, groupId)
            .then((group) => {
                if (group) {
                    return this.userService.getAll({ 'groups.id': groupId })
                        .then((users) => {
                            let members = users.map(this.secureUser);
                            return { members: members };
                        });
                } else {
                    throw new ResponseException(404, 'User is not in group');
                }
            });
    }

    rename(groupId, user, group) {
        return this.checkGroupPermission(user, groupId)
            .then((dbGroup) => {
                if (dbGroup && group.name) {
                    return this.groupService.update(groupId, { id: groupId }, { name: group.name });
                } else {
                    throw new ResponseException(404, 'User is not in group');
                }
            });
    }

    checkGroupPermission(user, groupId) {
        return this.userService.get(user)
            .then((user) => this.hasGroup(user, groupId));
    }

    getCurrentMembers(user) {
        return this.getMembers(user.activeGroup, user);
    }

    hasGroup(user, groupId) {
        return Promise.resolve(user.groups.find(group => group.id === groupId));
    }

    secureUser(user) {
        return { id: user.id, email: user.email, username: user.username };
    }

    leave(groupId, triggeredUser, affecteUser) {
        let dbAffectedUser;
        let triggeredUserHasGroup = this.userService.get(triggeredUser)
            .then(dbUser => this.hasGroup(dbUser, groupId));
        let affectedUserHasGroup = this.userService.get(affecteUser)
            .then(dbUser => {
                dbAffectedUser = dbUser;
                return this.hasGroup(dbUser, groupId);
            });

        return Promise.all([triggeredUserHasGroup, affectedUserHasGroup])
            .then((hasGroup) => {
                if (!hasGroup[0] || !hasGroup[1]) {
                    throw new ResponseException(404, 'User is not in group');
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