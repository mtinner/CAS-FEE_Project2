import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './pages/login/auth-guard.service';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];

export const appRoutingProviders: any[] = [AuthGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
