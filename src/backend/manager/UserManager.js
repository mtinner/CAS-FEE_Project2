'use strict';
let Group = require('../models/Group'),
    UserService = require('../services/UserService'),
    GroupService = require('../services/GroupService');

class UserManager {
    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    add(newDoc) {
        return this.groupService.add(new Group(undefined, 'Private'))
            .then(group=>
                this.userService.add(Object.assign(newDoc, {activeGroup: group.id, groups: [group], roles: ['user']}))
            );
    }
}

module.exports = UserManager;