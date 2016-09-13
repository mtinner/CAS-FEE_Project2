import {Component, Input} from '@angular/core';


@Component({
    selector: 'card',
    templateUrl: 'frontend/components/elements/card/card.component.html',
    styleUrls: ['frontend/components/elements/card/card.component.css']
})
export class CardComponent {
    @Input()
    title: string;
}
