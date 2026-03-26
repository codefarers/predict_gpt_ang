import { Component, inject, signal, OnInit } from '@angular/core';

import { finalize, take } from 'rxjs';

import { LigueOneControllerService } from '../../../../predict_http_api/getAllMatchesApi/services/ligueOneController.service';
import { SliceState } from '../../models/models';
import { Match } from '../../../../predict_http_api';
import { MatchesCard } from '../../compoonents/matches-card/matches-card';

@Component({
  selector: 'app-ligue-one-view',
  imports: [MatchesCard],
  template: `<app-matches-card [matchState]="ligueOneMatchState()">
  </app-matches-card>`,
  styles: ``,
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
