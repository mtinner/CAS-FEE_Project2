import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputValueControlAccessor, ProvideValueAccessor } from '../../common/helper/InputValueControlAccessor';

@Component({
    moduleId: module.id,
    selector: 'input-field',
    templateUrl: 'input-field.component.html',
    styleUrls: ['input-field.component.css'],
    providers: [ProvideValueAccessor(InputFieldComponent)]
})
export class InputFieldComponent extends InputValueControlAccessor implements OnInit {

    @Input()
    placeholder: string;

    @Input()
    type: string;

    @Input()
    text: string;

    @Input()
    errorMessage: string;

    @Output()
    enteredText = new EventEmitter();

    @Input()
    inputControl: FormControl;

    public isFocused: boolean = false;

    textEntered(text: string) {
        this.enteredText.emit(text);
    }

    ngOnInit(): void {
        this.setFocus(!!this.text);
    }

    setFocus<T>(...val: Array<T>) {
        this.isFocused = [...val].some(entry => {
            return !!entry;
        });
    }
}
