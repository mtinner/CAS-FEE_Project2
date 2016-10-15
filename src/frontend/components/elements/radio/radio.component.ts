import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'radio',
    templateUrl: 'radio.component.html',
    styleUrls: ['radio.component.css'],
})
export class RadioComponent {
    @Input()
    id: string;
    @Input()
    name: string;
    @Input()
    label: string;
    @Input()
    value: string;
    @Input()
    model: boolean;

    constructor() {
    }
}
