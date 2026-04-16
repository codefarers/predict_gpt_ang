import { Component, inject, signal, OnInit } from '@angular/core';

import { finalize, take } from 'rxjs';

import { LaLigaMatchControllerService } from '../../../../../../shared/predict_http_api/index';
import { Match } from '../../../../../../shared/predict_http_api/src/lib/getAllMatchesApi/models/match';

import { MatchesCard } from '../../compoonents/matches-card/matches-card';
import { SliceState } from '../../models/models';

@Component({
  selector: 'lib-major-league-upcoming-matches-laliga-view',
  imports: [MatchesCard],
  standalone: true,
  template: `<lib-major-league-upcoming-matches-card
    [matchState]="laLigaMatchState()"
  >
  </lib-major-league-upcoming-matches-card>`,
})
export class MatchesLaligaView implements OnInit {
  private _laligaService = inject(LaLigaMatchControllerService);

  readonly laLigaMatchState = signal<
    SliceState<{
      match: Match[];
      tournamentImage: string;
    }>
  >({
    loading: true,
    hasError: false,
  });

  ngOnInit() {
    this._laligaService
      .getLaligaMatches()
      .pipe(
        take(1),
        finalize(() => {
          this.laLigaMatchState.update((state) => ({
            ...state,
            loading: false,
          }));
        }),
      )
      .subscribe({
        next: (response) => {
          this.laLigaMatchState.update((state) => ({
            ...state,
            data: {
              match: response.matches ?? [],
              tournamentImage: response.competition?.emblem ?? '',
            },
          }));
        },
        error: () => {
          this.laLigaMatchState.update((state) => ({
            ...state,
            loading: false,
            hasError: true,
          }));
        },
      });
  }
}
