import {Component, Input} from '@angular/core';
import {InputValueControlAccessor, ProvideValueAccessor} from '../../common/helper/InputValueControlAccessor';


@Component({
    moduleId: module.id,
    selector: 'checkbox',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['checkbox.component.css'],
    providers: [ProvideValueAccessor(CheckboxComponent)]
})
export class CheckboxComponent extends InputValueControlAccessor {

    @Input()
    id: string;
    @Input()
    name: string;
    @Input()
    label: string;

    constructor() {
        super();
    }
}
