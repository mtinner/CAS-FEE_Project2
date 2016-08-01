import {provideRouter, RouterConfig}  from '@angular/router';
import {DashboardRoutes} from "./dashboard/dashboard.routes";


export const routes:RouterConfig = [
    ...DashboardRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
