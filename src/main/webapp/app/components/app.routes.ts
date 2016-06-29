import {provideRouter, RouterConfig}  from '@angular/router';
import {HeroesRoutes} from "./hero/heroes/heroes.routes";
import {DashboardRoutes} from "./hero/dashboard/dashboard.routes";
import {HeroDetailRoutes} from "./hero/heroDetail/hero-detail.routes";


export const routes:RouterConfig = [
    ...DashboardRoutes,
    ...HeroesRoutes,
    ...HeroDetailRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];