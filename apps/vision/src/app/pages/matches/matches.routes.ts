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
    ],
  },
];
