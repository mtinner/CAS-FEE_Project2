import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'input-field',
    templateUrl: 'input-field.component.html',
    styleUrls: ['input-field.component.css'],
})
export class InputFieldComponent {
    @Input()
    placeholder: string;

    @Input()
    type: string;

    @Output()
    enteredText = new EventEmitter();

    textEntered(text: string) {
        this.enteredText.emit(text);
    }

    private isFocused: boolean = false;

    setFocus<T>(...val: Array<T>) {
        this.isFocused = [...val].some(entry => {
            return !!entry;
        });
    }
}
