import { RouterConfig }          from '@angular/router';
import { HeroesComponent }     from '../heroes/heroes.component';
import { HeroDetailComponent }   from '../heroDetail/hero-detail.component';

export const HeroesRoutes: RouterConfig = [
    { path: 'heroes',  component: HeroesComponent },
    { path: 'hero/:id', component: HeroDetailComponent }
];
