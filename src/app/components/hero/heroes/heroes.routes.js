"use strict";
var heroes_component_1 = require('../heroes/heroes.component');
var hero_detail_component_1 = require('../heroDetail/hero-detail.component');
exports.HeroesRoutes = [
    { path: 'heroes', component: heroes_component_1.HeroesComponent },
    { path: 'hero/:id', component: hero_detail_component_1.HeroDetailComponent }
];
