"use strict";
var router_1 = require('@angular/router');
var heroes_routes_1 = require("./hero/heroes/heroes.routes");
var dashboard_routes_1 = require("./hero/dashboard/dashboard.routes");
var hero_detail_routes_1 = require("./hero/heroDetail/hero-detail.routes");
exports.routes = dashboard_routes_1.DashboardRoutes.concat(heroes_routes_1.HeroesRoutes, hero_detail_routes_1.HeroDetailRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
