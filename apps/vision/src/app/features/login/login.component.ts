import { Component, inject } from '@angular/core';
import { KeycloakService } from '../../core/auth/keyCloakService/keycloak-service';
import { LOGIN_CONSTANTS } from './constants/login-constants';

@Component({
  selector: 'app-login.component',
  imports: [],
  template: `
    <div
      class="vision-login-bg d-flex min-vh-100 justify-content-center align-items-center"
    >
      <div
        class="vision-login-card d-flex flex-column align-items-center justify-content-center rounded p-4 w-auto"
      >
        <img
          src="/vision-images/white-bg-vision-logo.png"
          alt="vision-logo"
          class="vision-logo"
        />
        <div class="text-center px-4">
          <div>
            <h5 class="fw-bold">WELCOME TO THE PITCH</h5>
            <div>
              <p class="text-muted small">
                Sign in to access our predictions for the upcoming big matches
              </p>
            </div>
          </div>
          <div class="d-flex flex-column my-3">
            <button
              class="btn login-keycloak-btn mb-2 d-flex align-items-center gap-2 justify-content-center"
              (click)="loginWithKeycloak()"
            >
              <i class="bi bi-key-fill fs-5"></i>
              Login via keycloak
            </button>
            <div
              class="d-flex align-items-center justify-content-center text-muted mb-2 gap-1"
            >
              <i class="bi bi-lock-fill fs-6"></i>
              <span class="small"
                >Secure authentication powered by keycloak SSO</span
              >
            </div>
          </div>
          <div>
            <div class="d-flex align-items-center w-100 mb-2">
              <hr class="flex-grow-1 border-dark" />
              <span class="mx-2">VISIOXI NETWORK</span>
              <hr class="flex-grow-1 border-dark" />
            </div>
            <div class="d-flex align-items-center justify-content-center">
              @for (item of loginConstants; track item.title; let idx = $index)
              {
              <div class="d-flex">
                @if (idx===1){
                <div class="vr mx-3"></div>
                }
                <div>
                  <p class="fw-bold vision-network-info-cards">
                    {{ item.info }}
                  </p>
                  <p class="small">{{ item.title }}</p>
                </div>
                @if (idx===1){
                <div class="vr mx-3"></div>
                }
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: '../../vision-styles/login-page/login.component.scss',
})
export class LoginComponent {
  private _keyCloakService = inject(KeycloakService);
  loginConstants = LOGIN_CONSTANTS;

  loginWithKeycloak(): void {
    this._keyCloakService.login();
  }
}
