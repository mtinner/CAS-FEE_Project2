import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderIcon, HeaderStyle} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';

@Component({
    moduleId: module.id,
    templateUrl: 'cost-management.component.html'
})
export class CostManagementComponent implements OnInit, OnDestroy {

    constructor(private headerService: HeaderService) {
    }

    leftIconClick = () => {
        console.log('left Icon');
    };

    rightIconClick = () => {
        console.log('right Icon');
    };

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Cost Management', HeaderStyle.CostManagement);
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
