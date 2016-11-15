import {Route} from '@angular/router';
import {MemberService} from './member.service';
import {MemberComponent} from './member.component';

export const memberRoute: Route = {
    path: 'groups/:id',
    component: MemberComponent,
    canActivate: [MemberService]
};
