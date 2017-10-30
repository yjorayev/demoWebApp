/// <reference path="./../node_modules/oidc-client/index.d.ts" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

//if (Constants.isProdModeEnabled) {
//    enableProdMode();
//}

//platformBrowserDynamic().bootstrapModule(AppModule);

if (process.env['ENV'] === 'production') {
    enableProdMode();
}

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}