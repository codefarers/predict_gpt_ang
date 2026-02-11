import { Component, inject } from '@angular/core';
import { KeycloakService } from '../../core/auth/keyCloakService/keycloak-service';
import { LOGIN_CONSTANTS } from './constants/login-constants';

@Component({
  selector: 'app-login.component',
  imports: [],
  template: `
    <div class="vision-login-bg min-vh-100">
      <div
        class="container d-flex justify-items-center align-items-center"
      >
        <div>
          <div>
            <div></div>
            <h3 class="text-white">Vision<span>XI</span></h3>
            <p class="text-muted">Get instant predictions</p>
          </div>
          <div>
            <div>
              <h5>Welcome to the pitch</h5>
              <p>
                Sign in to access our predictions for the upcoming big matches
              </p>
            </div>
            <div>
              <button (click)="loginWithKeycloak()">Login via keycloak</button>
              <span class="small"
                >Secure authentication powered by keycloak SSO</span
              >
            </div>
            <div>
              <p>VISIOXI NETWORK</p>
              <div>
                @for (item of loginConstants; track item.title){
                <div>
                  <h3>{{ item.info }}</h3>
                  <p>{{ item.title }}</p>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './styles/login.component.scss',
})
export class LoginComponent {
  private _keyCloakService = inject(KeycloakService);
  loginConstants = LOGIN_CONSTANTS;

  loginWithKeycloak(): void {
    this._keyCloakService.login();
  }
}
