import { Routes } from '@angular/router';
import { FootballMatches } from './football-matches';

export const FootballMatchesRoutes: Routes = [
  {
    path: '',
    component: FootballMatches,
    children: [
      {
        path: '',
        redirectTo: 'all-leagues',
        pathMatch: 'full',
      },
      {
        path: 'all-leagues',
        loadComponent: () =>
          import('./views/matches-list/matches-list').then(
            (m) => m.MatchesList,
          ),
      },
      {
        path: 'premier-league',
        loadComponent: () =>
          import('./views/matches-premier-league/matches-premier-league').then(
            (m) => m.MatchesPremierLeague,
          ),
      },
      {
        path: 'bundesliga',
        loadComponent: () =>
          import('./views/bundesliga-view/bundesliga-view').then(
            (m) => m.BundesligaView,
          ),
      },
      {
        path: 'laliga',
        loadComponent: () =>
          import('./views/matches-laliga-view/matches-laliga-view').then(
            (m) => m.MatchesLaligaView,
          ),
      },
      {
        path: 'ligue-one',
        loadComponent: () =>
          import('./views/ligue-one-view/ligue-one-view').then(
            (m) => m.LigueOneView,
          ),
      },
    ],
  },
];
