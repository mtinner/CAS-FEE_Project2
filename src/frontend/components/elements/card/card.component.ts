import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'card',
    templateUrl: 'card.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['card.component.css']
})
export class CardComponent {
    @Input()
    title: string;
}
