import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {Component} from '@angular/core'
import {HeroesComponent} from "./components/hero/heroes/heroes.component";
import {HeroService} from "./components/hero/hero.service";
import {DashboardComponent} from "./components/hero/dashboard/dashboard.component";
import {HeroDetailComponent} from "./components/hero/heroDetail/hero-detail.component";


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        /* HTTP_PROVIDERS goes normally here and not in main.ts*/
        ROUTER_PROVIDERS,
        HeroService
    ]
})

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
])

export class AppComponent {
    title = 'Tour of Heroes';
}