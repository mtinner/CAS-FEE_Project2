"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_1 = require('../shared/hero');
var hero_service_1 = require('../shared/hero.service');
var HeroDetailComponent = (function () {
    function HeroDetailComponent(heroService, route, router) {
        this.heroService = heroService;
        this.route = route;
        this.router = router;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    HeroDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot.params['id']) {
            // (+) converts string 'id' to a number
            var id = +this.route.snapshot.params['id'];
            this.heroService.getHero(id).then(function (hero) { return _this.hero = hero; });
        }
        else {
            this.navigated = false;
            this.hero = new hero_1.Hero();
        }
    };
    HeroDetailComponent.prototype.gotoHeroes = function () {
        this.close.emit(this.hero);
        this.router.navigate(['/heroes']);
    };
    HeroDetailComponent.prototype.save = function () {
        var _this = this;
        this.heroService
            .save(this.hero)
            .then(function (hero) {
            _this.hero = hero;
            _this.gotoHeroes();
        })
            .catch(function (error) { return _this.error = error; });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeroDetailComponent.prototype, "close", void 0);
    HeroDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-hero-detail',
            templateUrl: 'app/components/hero/heroDetail/hero-detail.component.html',
            styleUrls: ['app/components/hero/heroDetail/hero-detail.component.css']
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, (typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], HeroDetailComponent);
    return HeroDetailComponent;
    var _a, _b;
}());
exports.HeroDetailComponent = HeroDetailComponent;
