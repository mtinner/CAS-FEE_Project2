import {RouterConfig}          from '@angular/router';
import {HeroDetailComponent}   from '../heroDetail/hero-detail.component';

export const HeroDetailRoutes:RouterConfig = [
    {path: 'hero/:id', component: HeroDetailComponent}
];
