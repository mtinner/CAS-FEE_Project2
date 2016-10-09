import {Injectable} from '@angular/core';
import {SideNavService} from '../sidenav/side-nav.service';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {HeaderStyle, HeaderIcon} from './header.enum';

@Injectable()
export class HeaderService {

    public headerConfig: HeaderConfig;

    constructor(private sideNavService: SideNavService) {
        this.resetHeader();
    }

    setHeader(headerConfig: HeaderConfig) {
        this.headerConfig = headerConfig;
    }

    resetHeader() {
        this.headerConfig = new HeaderConfig('', HeaderStyle.Default);
    }

    clickLeftIcon() {
        if (this.headerConfig.leftFunctionCallback && typeof this.headerConfig.leftFunctionCallback === 'function') {
            this.headerConfig.leftFunctionCallback();
        }
        else {
            this.sideNavService.toggleNavigation();
        }
    }

    clickRightIcon() {
        if (this.headerConfig.rightFunctionCallback && typeof this.headerConfig.rightFunctionCallback === 'function') {
            this.headerConfig.rightFunctionCallback();
        }
    }
}