import {Component, Input} from '@angular/core';

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

    private isFocused: boolean = false;

    setFocus(val: boolean) {
        console.log(val);
        this.isFocused = val;
    }
}
