import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/components/hero/dashboard/dashboard.component.html',
    styleUrls: ['app/components/hero/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    constructor(
        private router: Router,
        private heroService: HeroService) {
    }
    ngOnInit() {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);
    }
}
