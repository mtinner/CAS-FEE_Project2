import {Component} from '@angular/core'
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';


@Component({
    selector: 'my-app',
    templateUrl: 'frontend/components/app.component.html',
    styleUrls: ['frontend/components/app.component.css'],
    directives: [DashboardComponent, LoginComponent]
})
export class AppComponent {
}
