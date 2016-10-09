import {Component, OnInit, OnDestroy} from '@angular/core';
import {ArticleGroup} from '../../../../models/ArticleGroup';
import {Article} from '../../../../models/Article';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';

@Component({
    moduleId: module.id,
    templateUrl: 'settings-menu.component.html'
})
export class SettingsMenuComponent {
    private addText: string = 'Add article';

    constructor(private headerService: HeaderService) {
        this.headerService.headerConfig = new HeaderConfig('Settings', HeaderStyle.Settings, HeaderIcon.burger);
    }
}
