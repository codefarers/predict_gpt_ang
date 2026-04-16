import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { filter, map, take, tap } from 'rxjs';

import { CloakService } from '../keyCloakService/keycloak-service';

export const authGuardGuard: CanActivateFn = () => {
  const keyCloak = inject(CloakService);

  return keyCloak.authenticated$.pipe(
    filter((auth) => auth !== null),
    take(1),
    tap((auth) => {
      if (!auth) {
        keyCloak.login();
      }
    }),
    map((auth) => !!auth),
  );
};
