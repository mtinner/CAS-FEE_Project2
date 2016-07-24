import {ROUTER_DIRECTIVES} from '@angular/router';

import {Component} from '@angular/core'
import {HeroService} from "./hero/shared/hero.service";


@Component({
    selector: 'my-app',
    templateUrl: 'frontend/components/app.component.html',
    styleUrls: ['frontend/components/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HeroService
    ]
})
export class AppComponent {
    title = 'Tour of Heroes';
}
