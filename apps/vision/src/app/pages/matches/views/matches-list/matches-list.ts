import { Component, inject, OnInit, signal } from '@angular/core';

import { finalize, take } from 'rxjs';

import { GetTodayMatchesControllerService } from '../../../../predict_http_api/getAllMatchesApi/services/getTodayMatchesController.service';
import { SliceState } from '../../models/models';
import { Match } from '../../../../predict_http_api';
import { MatchesCard } from '../../compoonents/matches-card/matches-card';

@Component({
  selector: 'app-matches-list',
  imports: [MatchesCard],
  template: `
    <app-matches-card [matchState]="allMatchesState()"></app-matches-card>
  `,
})
export class MatchesList implements OnInit {
  private _getTodayMatchesService = inject(GetTodayMatchesControllerService);

  readonly allMatchesState = signal<SliceState<{ match: Match[] }>>({
    loading: true,
    hasError: false,
  });

  ngOnInit() {
    this._getTodayMatchesService
      .getAllMatches()
      .pipe(
        take(1),
        finalize(() =>
          this.allMatchesState.update((state) => ({
            ...state,
            loading: false,
          })),
        ),
      )
      .subscribe({
        next: (response) => {
          this.allMatchesState.update((state) => ({
            ...state,
            data: {
              match: response.matches ?? [],
            },
          }));
        },
        error: () => {
          this.allMatchesState.update((state) => ({
            ...state,
            loading: false,
            hasError: true,
          }));
        },
      });
  }
}
