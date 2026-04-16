import { Component, inject, OnInit, signal } from '@angular/core';

import { finalize, take } from 'rxjs';

import { GetTodayMatchesControllerService } from '@vision/vision-http-ang';
import { Match } from '@vision/vision-http-ang';

import { SliceState } from '../../models/models';
import { MatchesCard } from '../../compoonents/matches-card/matches-card';


@Component({
  selector: 'lib-major-league-upcoming-matches-list',
  imports: [MatchesCard],
  template: `
    <lib-major-league-upcoming-matches-card
      [matchState]="allMatchesState()"
    ></lib-major-league-upcoming-matches-card>
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
