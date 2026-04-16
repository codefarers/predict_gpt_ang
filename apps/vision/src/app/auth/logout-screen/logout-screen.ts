import { Component, inject } from '@angular/core';
import { CloakService } from '../../core/auth/keyCloakService/keycloak-service';

@Component({
  selector: 'app-logout-screen',
  imports: [],
  template: ` <p>logging out...</p> `,
})
export class LogoutScreen {
  private _cloakService = inject(CloakService);
  constructor() {
    this._cloakService.logout();
  }
}
