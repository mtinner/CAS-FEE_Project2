import { async, inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { CostManagementComponent } from './cost-management.component';
import { CostManagementModule } from './cost-management.module';

import { CostManagementService } from './cost-management.service';



describe('CostManagementComponent', () => {
    let component: CostManagementComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CostManagementComponent]
            // imports: [CostManagementModule],
            // providers: [
            //     { provide: ActivatedRoute, useValue: activatedRoute },
            //     { provide: Router, useClass: RouterStub },
            // ]
        }).compileComponents();
    }));

    it('should define 1 as 1', () => {
        expect(1).toBe(1);
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
});