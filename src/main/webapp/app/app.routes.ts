import {provideRouter, RouterConfig}  from '@angular/router';
import {HeroesRoutes} from "./components/hero/heroes/heroes.routes";
import {DashboardRoutes} from "./components/hero/dashboard/dashboard.routes";
import {HeroDetailRoutes} from "./components/hero/heroDetail/hero-detail.routes";


export const routes:RouterConfig = [
    ...DashboardRoutes,
    ...HeroesRoutes,
    ...HeroDetailRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];