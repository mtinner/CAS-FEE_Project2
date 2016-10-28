import {Component, Input, EventEmitter, Output} from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'panel',
    templateUrl: 'panel.component.html',
    styleUrls: ['panel.component.css']
})
export class PanelComponent {
    @Input()
    title: string;
    @Input()
    description: string;
    @Input()
    rightIconName: string;
    @Output()
    clickIconRight = new EventEmitter();

    iconRightClicked() {
        this.clickIconRight.emit(this);
    }
}
