'use strict';
let Group = require('../models/Group'),
    UserService = require('../services/UserService'),
    GroupService = require('../services/GroupService');

class UserManager {
    constructor() {
        this.userService = UserService.instance;
        this.groupService = GroupService.instance;
    }

    add(newDoc) {
        return this.groupService.add(new Group(undefined, 'Private'))
            .then(group=>
                this.userService.add(Object.assign(newDoc, {
                    activeGroup: group.id,
                    groups: [{id: group.id}],
                    roles: ['user']
                }))
            );
    }
}

module.exports = UserManager;