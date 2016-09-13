import {Component, Input} from '@angular/core';

@Component({
    selector: 'chip',
    templateUrl: 'frontend/components/elements/chip/chip.component.html',
    styleUrls: ['frontend/components/elements/chip/chip.component.css'],
})
export class ChipComponent {
    @Input()
    title: string;
}
