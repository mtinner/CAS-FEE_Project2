import {Injectable} from '@angular/core';
import {SideNavService} from '../sidenav/side-nav.service';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {Header} from './header.enum';

@Injectable()
export class HeaderService {

    public headerConfig: HeaderConfig;

    private leftFunctionCallback;

    constructor(private sideNavService: SideNavService) {
        this.headerConfig = new HeaderConfig('', Header.Default);
    }

    setHeader(headerConfig: HeaderConfig) {
        this.headerConfig = headerConfig;
    }

    resetHeader() {
        this.headerConfig = {
            title: '',
            type: Header.Default
        };
    }

    clickLeftIcon() {
        if (this.leftFunctionCallback) {

        }
        else {
            this.sideNavService.toggleNavigation();
        }
    }
}