import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'input-field',
    templateUrl: 'frontend/components/elements/inputField/input-field.component.html',
    styleUrls: ['frontend/components/elements/inputField/input-field.component.css'],
})
export class InputFieldComponent {
    @Input()
    placeholder: string;

    @Input()
    type: string;

    @Output()
    enteredText = new EventEmitter();

    textEntered(text:string) {
        this.enteredText.emit(text);
    }

    private isFocused: boolean = false;

    setFocus<T>(...val: Array<T>) {
        this.isFocused = [...val].some(entry=> {
            return !!entry
        });
    }
}
