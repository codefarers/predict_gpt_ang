import { Route } from '@angular/router';

import { LogoutScreen } from './auth/logout-screen/logout-screen';
import { authGuardGuard } from './core/auth/keyCloakAuthGuards/auth-guard-guard';
import { LoginComponent } from './auth/login/login.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@vision/vision-home-page').then((m) => m.VisionHomePage),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'football-major-league-upcoming-matches',
    loadChildren: () =>
      import('@vision/major-league-matches').then(
        (m) => m.FootballMatchesRoutes,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'logout',
    component: LogoutScreen,
  },
  {
    path: '**',
    loadComponent: () =>
      import('@vision/not-found-page').then((m) => m.NotFound),
  },
];
