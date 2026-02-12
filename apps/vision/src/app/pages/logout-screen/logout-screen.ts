import { Component, inject } from '@angular/core';
import { KeycloakService } from '../../core/auth/keyCloakService/keycloak-service';

@Component({
  selector: 'app-logout-screen',
  imports: [],
  template: ` <p>logging out...</p> `,
})
export class LogoutScreen {
  private _keyCloakService = inject(KeycloakService);
  constructor() {
    this._keyCloakService.logout();
  }
}
