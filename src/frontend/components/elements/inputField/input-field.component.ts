import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {InputValueControlAccessor, ProvideValueAccessor} from '../../common/helper/InputValueControlAccessor';

@Component({
    moduleId: module.id,
    selector: 'input-field',
    templateUrl: 'input-field.component.html',
    styleUrls: ['input-field.component.css'],
    providers: [ProvideValueAccessor(InputFieldComponent)]
})
export class InputFieldComponent extends InputValueControlAccessor {

    @Input()
    placeholder: string;

    @Input()
    type: string;

    @Input()
    errorMessage: string;

    @Input()
    inputControl: FormControl;

    // AoT
    public isFocused: boolean = false;
}
