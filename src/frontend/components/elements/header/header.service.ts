import {Injectable} from '@angular/core';
import {SideNavService} from '../sidenav/side-nav.service';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {HeaderStyle, HeaderIcon} from './header.enum';

@Injectable()
export class HeaderService {

    public headerConfig: HeaderConfig;

    private leftFunctionCallback;

    constructor(private sideNavService: SideNavService) {
        this.headerConfig = new HeaderConfig('', HeaderStyle.Default, HeaderIcon.burger);
    }

    setHeader(headerConfig: HeaderConfig) {
        this.headerConfig = headerConfig;
    }

    resetHeader() {
        this.headerConfig = new HeaderConfig('', HeaderStyle.Default, HeaderIcon.burger);
    }

    clickLeftIcon() {
        if (this.leftFunctionCallback && typeof this.leftFunctionCallback === 'function') {

        }
        else {
            this.sideNavService.toggleNavigation();
        }
    }
}