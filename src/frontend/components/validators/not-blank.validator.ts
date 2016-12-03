import {ValidatorFn, FormControl} from '@angular/forms';

export const validateNotBlank: ValidatorFn = (c: FormControl) => {

    return c.value && !!(c.value).trim() ? null : {
        validateBlang: {
            valid: false
        }
    };
};
