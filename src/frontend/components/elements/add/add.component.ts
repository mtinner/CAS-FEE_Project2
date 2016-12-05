import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'add',
    styleUrls: ['add.component.css'],
    templateUrl: 'add.component.html'
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
