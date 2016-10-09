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
    settings: Setting[] = [
        new Setting('Group Membership', 'Manage with whom you\'re sharing shopping list & expenditures'),
        new Setting('Article Groups', 'Set how individual articles should be grouped'),
        new Setting('History')
    ];

    constructor(private headerService: HeaderService) {
        this.headerService.headerConfig = new HeaderConfig('Settings', HeaderStyle.Settings, HeaderIcon.burger);
    }
}

class Setting {
    constructor(private title: string, private description: string = null) {
    }
}
