import { environment } from '../environments/environment';  // Importar el archivo environment

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { issuesReducer } from './store/issues.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ issues: issuesReducer }),
    {
      provide: StoreDevtoolsModule,
      useFactory: () => StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,  // Usa el valor de production del archivo environment
      }),
    },
  ],
};