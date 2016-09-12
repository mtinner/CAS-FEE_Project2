import {Component, Input} from '@angular/core';


@Component({
    selector: 'chip',
    templateUrl: 'frontend/components/chip/chip.component.html',
    styleUrls: ['frontend/components/chip/chip.component.css'],
})
export class ChipComponent {
    @Input()
    item: any;
}
