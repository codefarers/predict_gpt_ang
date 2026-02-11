import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, tap } from 'rxjs';
import Keycloak from 'keycloak-js';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak!: Keycloak;

  private _authenticatedSubject = new BehaviorSubject<boolean | undefined>(undefined);
  authenticated$ = this._authenticatedSubject.asObservable();

  init(): Promise<boolean> {
    this._keycloak = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });

    return this._keycloak.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        this._authenticatedSubject.next(authenticated);
        return authenticated;
      })
      .catch((err)=>{
        console.error('KeyCloak init failed with: ' + err);
        this._authenticatedSubject.next(false);
        return false;
      })
  }

  login(): void {
    this._keycloak.login({
      redirectUri: window.location.origin + '/protected',
    });
  }

  logout(): Observable<void> {
    return from(
      this._keycloak.logout({
        redirectUri: window.location.origin,
      })
    ).pipe(tap(() => this._authenticatedSubject.next(false)));
  }

  isLoggedin(): boolean {
    return !!this._keycloak?.authenticated;
  }

  getToken(): Observable<string> {
    return from(this._keycloak.updateToken(30)).pipe(
      map(() => this._keycloak.token as string)
    );
  }
}
