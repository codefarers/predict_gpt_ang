import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from '../keyCloakService/keycloak-service';
import { filter, map, take, tap } from 'rxjs';

export const authGuardGuard: CanActivateFn = () => {
  const keyCloak = inject(KeycloakService);

  return keyCloak.authenticated$.pipe(
    filter(auth => auth !==null),
    take(1),
    tap(auth => {
      if(!auth) {
        keyCloak.login();
      }
    }),
    map(auth => !!auth)
  )
};
