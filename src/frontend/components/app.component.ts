import {Component} from '@angular/core';
import {DashboardComponent} from './elements/dashboard/dashboard.component';


@Component({
    selector: 'my-app',
    templateUrl: 'frontend/components/app.component.html',
    styleUrls: ['frontend/components/app.component.css'],
    directives: [DashboardComponent]
})
export class AppComponent {
}
