import { Component, inject, signal, OnInit } from '@angular/core';

import { finalize, take } from 'rxjs';

import { LigueOneControllerService } from '../../../../../../shared/predict_http_api/index';
import { Match } from '../../../../../../shared/predict_http_api/src/lib/getAllMatchesApi/models/match';

import { SliceState } from '../../models/models';

import { MatchesCard } from '../../compoonents/matches-card/matches-card';

@Component({
  selector: 'lib-ligue-one-view',
  imports: [MatchesCard],
  standalone: true,
  template: `<lib-major-league-upcoming-matches-card
    [matchState]="ligueOneMatchState()"
  >
  </lib-major-league-upcoming-matches-card>`,
})
export class LigueOneView implements OnInit {
  private _ligueOneService = inject(LigueOneControllerService);

  readonly ligueOneMatchState = signal<
    SliceState<{
      match: Match[];
      tournamentImage: string;
    }>
  >({
    loading: true,
    hasError: false,
  });

  ngOnInit() {
    this._ligueOneService
      .getLigueOneMatches()
      .pipe(
        take(1),
        finalize(() => {
          this.ligueOneMatchState.update((state) => ({
            ...state,
            loading: false,
          }));
        }),
      )
      .subscribe({
        next: (response) => {
          this.ligueOneMatchState.update((state) => ({
            ...state,
            data: {
              match: response.matches ?? [],
              tournamentImage: response.competition?.emblem ?? '',
            },
          }));
        },
        error: () => {
          this.ligueOneMatchState.update((state) => ({
            ...state,
            loading: false,
            hasError: true,
          }));
        },
      });
  }
}
