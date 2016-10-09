import {Injectable} from '@angular/core';
import {SideNavService} from '../sidenav/side-nav.service';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {HeaderStyle} from './header.enum';

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
        if (this.headerConfig.leftCallback && typeof this.headerConfig.leftCallback === 'function') {
            this.headerConfig.leftCallback();
        }
        else {
            this.sideNavService.toggleNavigation();
        }
    }

    clickRightIcon() {
        if (this.headerConfig.rightCallback && typeof this.headerConfig.rightCallback === 'function') {
            this.headerConfig.rightCallback();
        }
    }
}