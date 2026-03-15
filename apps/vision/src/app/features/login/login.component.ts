import { Component, inject } from '@angular/core';
import { CloakService } from '../../core/auth/keyCloakService/keycloak-service';
import { LOGIN_CONSTANTS } from './constants/login-constants';

@Component({
  selector: 'app-login.component',
  imports: [],
  template: `
    <div
      class="vision-login-bg d-flex min-vh-100 justify-content-center align-items-center"
    >
      <div
        class="d-flex bg-white flex-column align-items-center justify-content-center rounded py-4 px-2"
      >
        <img
          src="/vision-images/transparent_vision_logo.png"
          alt="vision-logo"
          class="vision-logo img-fluid"
        />

        <div class="text-center px-4">
          <div>
            <h5 class="fw-bold">WELCOME BACK</h5>
            <div>
              <small class="text-muted">
                Sign in to access our predictions on upcoming matches
              </small>
            </div>
          </div>
          <div class="d-flex flex-column">
            <button
              class="btn my-4 gap-2  vision-green-btn text-white"
              (click)="loginWithKeycloak()"
            >
              <i class="bi bi-key-fill fs-6"></i>
              Sign in
            </button>
            <div
              class="d-flex align-items-center justify-content-center text-muted mb-2 gap-1"
            >
              <i class="bi bi-lock-fill fs-6"></i>
              <small>Secure authentication powered by keycloak SSO</small>
            </div>
          </div>
          <div>
            <div class="d-flex align-items-center w-100 mb-2">
              <hr class="flex-grow-1 border-dark" />
              <span class="mx-2">VISIOXI NETWORK</span>
              <hr class="flex-grow-1 border-dark" />
            </div>
            <div class="d-flex align-items-center justify-content-center">
              @for (
                item of loginConstants;
                track item.title;
                let idx = $index
              ) {
                <div class="d-flex">
                  @if (idx === 1) {
                    <div class="vr mx-3"></div>
                  }
                  <div class="text-center">
                    <h6 class="text-success">
                      {{ item.title }}
                    </h6>
                    <small class="small">{{ item.info }}</small>
                  </div>
                  @if (idx === 1) {
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
  private _cloakService = inject(CloakService);
  loginConstants = LOGIN_CONSTANTS;

  loginWithKeycloak(): void {
    this._cloakService.login();
  }
}
