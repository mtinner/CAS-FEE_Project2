import {FormArray} from '@angular/forms';

export function validateSomeOfArray(c: FormArray) {

    return c.value.some((t) => t) ? null : {
        someOfArray: {
            invalid: true
        }
    };
}