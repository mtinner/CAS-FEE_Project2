import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'checkbox',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['checkbox.component.css']
})
export class CheckboxComponent {

    @Input()
    id: string;
    @Input()
    name: string;
    @Input()
    label: string;
    @Input()
    checked: boolean;
    // AOT
    public change;

    constructor() {
    }
}