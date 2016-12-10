import {Route} from '@angular/router';
import {MemberComponent} from './member.component';
import {GroupService} from '../../common/services/group.service';

export const memberRoute: Route = {
    path: 'groups/:id',
    component: MemberComponent,
    canActivate: [GroupService]
};
