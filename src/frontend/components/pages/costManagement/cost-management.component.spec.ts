import { async, inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { CostManagementComponent } from './cost-management.component';
import { CostManagementModule } from './cost-management.module';
import { CostManagementService } from './cost-management.service';
import { ElementModule } from '../../elements/element.module';
import { appRoutingProviders } from '../../app.routing';
import { LoginHttpService } from '../../pages/login/login-http.service';
import { LoginManagingService } from '../../pages/login/login-managing.service';
import { RegisterService } from '../../pages/register/register.service';
import { authServiceProvider } from '../../common/authentication/auth-http.provider';
import { HeaderService } from '../../elements/header/header.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

let component: CostManagementComponent;
let fixture: ComponentFixture<CostManagementComponent>;

describe('CostManagementComponent', () => {
    let component: CostManagementComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CostManagementComponent],
            imports: [ElementModule],
            providers: [
                { provide: HeaderService, useClass: HeaderService },
                { provide: CostManagementService, useClass: CostManagementService },
                { provide: Http, useValue: null },
                { provide: Router, useValue: null },
            ],
        }).compileComponents();
    }));

    beforeEach((() => {
        fixture = TestBed.createComponent(CostManagementComponent);
        component = fixture.componentInstance;
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
});