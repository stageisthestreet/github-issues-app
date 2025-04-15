  // Importar el archivo environment

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore, StoreModule } from '@ngrx/store';
import { issuesReducer } from './store/issues.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IssuesEffects } from './store/issues.effects';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ issues: issuesReducer }),
    {
      provide: StoreDevtoolsModule,
      useFactory: () => StoreDevtoolsModule.instrument({
        maxAge: 25
      }),
    },
    provideEffects([IssuesEffects])
  ],
};