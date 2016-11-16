import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'cost-progress',
    templateUrl: 'cost-progress.component.html',
    styleUrls: ['cost-progress.component.css'],
})
export class CostProgress {
    @Input()
    amount: number;
    @Input()
    percentage: number;
    @Input()
    label: string;

    private percentageAbs: number;

    constructor() {
    }

    ngOnInit(): void {
        this.percentageAbs = Math.abs(this.percentage);
    }
}
