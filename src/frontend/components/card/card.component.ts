import {Component, Input} from '@angular/core';
import {Group} from "../../models/Group";


@Component({
    selector: 'card',
    templateUrl: 'frontend/components/card/card.component.html',
    styleUrls: ['frontend/components/card/card.component.css'],
})
export class CardComponent {
    @Input()
    group: Group;
}
