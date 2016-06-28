import {ROUTER_DIRECTIVES} from '@angular/router';

import {Component} from '@angular/core'
import {HeroService} from "./components/hero/shared/hero.service";


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HeroService
    ]
})
export class AppComponent {
    title = 'Tour of Heroes';
}