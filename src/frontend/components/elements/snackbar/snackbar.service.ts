import {Injectable} from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Injectable()
export class SnackbarService {
    public displaySnackbar = false;
    public text: string = '';

    constructor() {
    }

    showSnackbar(text: string): boolean {
        if (!this.displaySnackbar && text) {
            this.text = text;
            this.displaySnackbar = true;
            let timer = TimerObservable.create(8000),
                subscription = timer.subscribe(() => {
                    this.hideSnackbar();
                    subscription.unsubscribe();
                });
            return true;
        }
        return false;
    }

    hideSnackbar = () => {
        this.displaySnackbar = false;
    }
}