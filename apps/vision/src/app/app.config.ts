import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { appRoutes } from './app.routes';
import { provideRouter } from '@angular/router';
import { KeycloakService } from './core/auth/keyCloakService/keycloak-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(() => {
      const keycloakService = inject(KeycloakService);
      return keycloakService.init();
    }),
  ],
};
