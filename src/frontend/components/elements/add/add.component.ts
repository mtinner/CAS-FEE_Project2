import {Component, Input} from '@angular/core';

@Component({
    selector: 'add',
    templateUrl: 'frontend/components/elements/add/add.component.html',
    styleUrls: ['frontend/components/elements/add/add.component.css'],
})
export class AddComponent {
    @Input()
    text: string;

    enterPressed(text) {
        console.log(text);
    }
}
