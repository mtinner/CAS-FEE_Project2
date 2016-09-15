import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'add',
    templateUrl: 'frontend/components/elements/add/add.component.html',
    styleUrls: ['frontend/components/elements/add/add.component.css'],
})
export class AddComponent {
    @Input()
    text: string;

    @Output()
    enterText = new EventEmitter();

    enterPressed(text) {
        if (text.value) {
            this.enterText.emit(text.value);
            text.value = '';
        }
        text.focus();
    }
}
