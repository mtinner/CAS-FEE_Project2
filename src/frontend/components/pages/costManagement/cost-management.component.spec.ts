import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CostManagementComponent } from './cost-management.component';
import {CostManagementService} from '../../common/services/cost-management.service';
import { ElementModule } from '../../elements/element.module';
import { HeaderService } from '../../elements/header/header.service';
import {HeaderConfig} from '../../../models/HeaderConfig';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

let component: CostManagementComponent;
let fixture: ComponentFixture<CostManagementComponent>;

class FakeHeaderService extends HeaderService {
    setHeader(headerConfig: HeaderConfig) {
    }

    resetHeader() {
    }

    clickLeftIcon() {
    }

    clickRightIcon() {
    }
}

describe('CostManagementComponent', () => {
    let component: CostManagementComponent;
    let getExpensesSpy: jasmine.Spy;
    let getExpensesCalled = 'getExpensesCalled';
    let costManagementService: CostManagementService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CostManagementComponent],
            imports: [ElementModule],
            providers: [
                { provide: HeaderService, useClass: FakeHeaderService },
                { provide: CostManagementService, useClass: CostManagementService },
                { provide: Http, useValue: null },
                { provide: Router, useValue: null }
            ],
        }).compileComponents();
    }));

    beforeEach((() => {
        fixture = TestBed.createComponent(CostManagementComponent);
        component = fixture.componentInstance;
        costManagementService = fixture.debugElement.injector.get(CostManagementService);
        getExpensesSpy = spyOn(costManagementService, 'getExpenses').and.returnValue(Promise.resolve(getExpensesCalled));
    }));

    it('is defined', () => {
        expect(component).toBeDefined();
    });

    it('should not call getExpenses before ngInit', () => {
        expect(getExpensesSpy.calls.any()).toBe(false, 'getExpenses called');
    });

    it('should call getExpenses on ngInit', () => {
        fixture.detectChanges();
        expect(getExpensesSpy.calls.any()).toBe(true, 'getExpenses not called');
    });
});