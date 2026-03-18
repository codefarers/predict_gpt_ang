import { Route } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { UnprotectedRoute } from './pages/unprotected-route/unprotected-route';
import { LogoutScreen } from './pages/logout-screen/logout-screen';
import { authGuardGuard } from './core/auth/keyCloakAuthGuards/auth-guard-guard';
import { LoginComponent } from './pages/login/login.component';
import { NotFound } from './pages/not-found/not-found';
import { FootballMatchesRoutes } from './pages/matches/matches.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'public',
    component: UnprotectedRoute,
  },
  {
    path: 'football-matches',
    loadChildren: () =>
      import('./pages/matches/matches.routes').then(
        m => m.FootballMatchesRoutes,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'logout',
    component: LogoutScreen,
  },
  {
    path: '**',
    component: NotFound,
  },
];
