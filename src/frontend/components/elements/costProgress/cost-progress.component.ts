import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'cost-progress',
    templateUrl: 'cost-progress.component.html',
    styleUrls: ['cost-progress.component.css'],
})
export class CostProgress {
    private progressClass: 'progress' | 'progress--reversed' = 'progress';
    @Input()
    amount: number;
    @Input()
    percentage: number;
    @Input()
    label: string;

    constructor() {
    }

    ngOnInit(): void {
        if (this.percentage < 0) {
            this.percentage = Math.abs(this.percentage);
            this.progressClass = 'progress--reversed';
        }
    }
}
