// removeIf(development)
import { AppModuleNgFactory } from '../.aot/src/.tmpProd/app/app.module.ngfactory';
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
// endRemoveIf(development)


// removeIf(production)
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
// endRemoveIf(production)