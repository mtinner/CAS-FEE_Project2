import {Component, Input} from '@angular/core';
import {ChipComponent} from "../chip/chip.component";


@Component({
    selector: 'card',
    templateUrl: 'frontend/components/card/card.component.html',
    styleUrls: ['frontend/components/card/card.component.css'],
    directives: [ChipComponent]
})
export class CardComponent {
    @Input()
    title: any;
    @Input()
    items: any[];
}
