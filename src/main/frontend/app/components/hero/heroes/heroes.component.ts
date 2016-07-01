import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {Hero} from '../shared/hero';
import {HeroDetailComponent} from './../heroDetail/hero-detail.component';
import {HeroService} from '../shared/hero.service';


@Component({
    selector: 'my-heroes',
    templateUrl: 'app/components/hero/heroes/heroes.component.html',
    styleUrls: ['app/components/hero/heroes/heroes.component.css'],
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
    heroes:Hero[];
    selectedHero:Hero;
    addingHero = false;
    error:any;

    constructor(private heroService:HeroService,
                private router:Router) {
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    delete(hero:Hero, event:any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            })
            .catch(error => this.error = error);
    }

    close(savedHero:Hero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    }

    ngOnInit() {
        this.getHeroes();
    }

    onSelect(hero:Hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    }

    gotoDetail() {
        this.router.navigate(['/hero', this.selectedHero.id]);
    }
}
