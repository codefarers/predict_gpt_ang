import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { PredictNavbar } from './compoonents/predict-navbar/predict-navbar';
import { LEAGUE_NAMES } from './helpers/constants';

@Component({
  selector: 'lib-football-major-league-upcoming-matches',
  imports: [PredictNavbar, RouterOutlet, RouterLink, RouterLinkActive],
  standalone: true,
  template: `
    <div class="vision-matches-layout">
      <lib-predict-navbar></lib-predict-navbar>
      <div>
        <div class="container">
          <div class="mb-4 mt-5">
            <h2>Discover Matches</h2>
            <p class="text-muted mb-4">
              Filter and find the best football games across top global leagues.
            </p>

            <nav class="nav d-flex align-items-center gap-2">
              @for (item of _leagueTypes; track item.linkText) {
                <div
                  class="border rounded small matches-league-links d-flex align-items-center p-3 gap-2"
                  [class.bg-dark]="rla.isActive"
                  [class.border-0]="rla.isActive"
                >
                  <i
                    class="bi bi-trophy text-light"
                    [class.d-none]="!rla.isActive"
                  ></i>
                  <a
                    class="nav-link p-0"
                    routerLinkActive="text-light fw-bold"
                    [routerLink]="item.link"
                    [class.text-muted]="!rla.isActive"
                    [routerLinkActiveOptions]="{ exact: true }"
                    #rla="routerLinkActive"
                  >
                    {{ item.linkText }}
                  </a>
                </div>
              }
            </nav>
          </div>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class FootballMatches {
  protected readonly _leagueTypes = LEAGUE_NAMES;
}
