import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'chip',
    templateUrl: 'chip.component.html',
    styleUrls: ['chip.component.css'],
})
export class ChipComponent {
    @Input()
    item: {name};
    @Output()
    chipClicked = new EventEmitter();

    constructor() {
    }

    clicked() {
        this.chipClicked.emit(this.item);
    }

}
