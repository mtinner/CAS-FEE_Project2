"use strict";
var dashboard_component_1 = require("./dashboard.component");
exports.DashboardRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        terminal: true
    }, {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    }
];
