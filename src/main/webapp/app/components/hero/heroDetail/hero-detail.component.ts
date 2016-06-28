import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';


@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/components/hero/heroDetail/hero-detail.component.html',
    styleUrls: ['app/components/hero/heroDetail/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero:Hero;
    @Output() close = new EventEmitter();
    error:any;
    navigated = false; // true if navigated here

    constructor(private heroService:HeroService,
                private route:ActivatedRoute,
                private router:Router) {
    }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            // (+) converts string 'id' to a number
            let id = +this.route.snapshot.params['id'];
            this.heroService.getHero(id).then(hero => this.hero = hero);
        }
        else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }


    gotoHeroes() {
        this.close.emit(this.hero);
        this.router.navigate(['/heroes']);
    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.gotoHeroes();
            })
            .catch(error => this.error = error);
    }

}
