import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize, take } from 'rxjs';

import { FootballControllerService } from '../../../../../../shared/predict_http_api/index';
import { Match } from '../../../../../../shared/predict_http_api/src/lib/getAllMatchesApi/models/match';

import { SliceState } from '../../models/models';
import { MatchesCard } from '../../compoonents/matches-card/matches-card';

@Component({
  selector: 'lib-major-league-upcoming-matches-premier-league',
  imports: [MatchesCard],
  template: ` <lib-major-league-upcoming-matches-card
    [matchState]="premierLeagueMatchState()"
  >
  </lib-major-league-upcoming-matches-card>`,
})
export class MatchesPremierLeague implements OnInit {
  private _premierLeagueMatchService = inject(FootballControllerService);

  readonly premierLeagueMatchState = signal<
    SliceState<{
      match: Match[];
      tournamentImage: string;
    }>
  >({
    loading: true,
    hasError: false,
  });

  ngOnInit() {
    this._premierLeagueMatchService
      .getMatches()
      .pipe(
        take(1),
        finalize(() => {
          this.premierLeagueMatchState.update((state) => ({
            ...state,
            loading: false,
          }));
        }),
      )
      .subscribe({
        next: (response) => {
          this.premierLeagueMatchState.update((state) => ({
            ...state,
            data: {
              match: response.matches ?? [],
              tournamentImage: response.competition?.emblem ?? '',
            },
          }));
        },
        error: () => {
          this.premierLeagueMatchState.update((state) => ({
            ...state,
            loading: false,
            hasError: true,
          }));
        },
      });
  }
}
