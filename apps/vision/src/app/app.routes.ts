import { Route } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { ProtectedRoute } from './pages/protected-route/protected-route';
import { UnprotectedRoute } from './pages/unprotected-route/unprotected-route';
import { LogoutScreen } from './pages/logout-screen/logout-screen';
import { NotFound } from './pages/not-found/not-found';
import { authGuardGuard } from './core/auth/keyCloakAuthGuards/auth-guard-guard';
import { LoginComponent } from './features/login/login.component';

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
    component: UnprotectedRoute
  },
  {
    path: 'protected',
    component: ProtectedRoute,
    canActivate: [authGuardGuard],
  },
  {
    path: 'logout',
    component: LogoutScreen,
  },
  {
    path: '**',
    component: NotFound,
  }
];
