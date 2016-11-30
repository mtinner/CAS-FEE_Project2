import {Component, Input} from '@angular/core';
import {InputValueControlAccessor, ProvideValueAccessor} from '../../common/helper/InputValueControlAccessor';

@Component({
    moduleId: module.id,
    selector: 'radio',
    templateUrl: 'radio.component.html',
    styleUrls: ['radio.component.css'],
    providers: [ProvideValueAccessor(RadioComponent)]
})
export class RadioComponent extends InputValueControlAccessor {

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
