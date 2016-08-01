import {ROUTER_DIRECTIVES} from '@angular/router';

import {Component} from '@angular/core'


@Component({
    selector: 'my-app',
    templateUrl: 'frontend/components/app.component.html',
    styleUrls: ['frontend/components/app.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
    title = 'Tour of Heroes';
}
