import { Component, inject, signal, OnInit } from '@angular/core';

import { finalize, take } from 'rxjs';

import {
  BundesligaMatchesControllerService,
  Match,
} from '@vision/vision-http-ang';

import { SliceState } from '../../models/models';
import { MatchesCard } from '../../compoonents/matches-card/matches-card';

@Component({
  selector: 'lib-bundesliga-view',
  imports: [MatchesCard],
  standalone: true,
  template: `<lib-major-league-upcoming-matches-card
    [matchState]="bundesligaMatchState()"
  >
  </lib-major-league-upcoming-matches-card>`,
})
export class BundesligaView implements OnInit {
  private _bundesligaService = inject(BundesligaMatchesControllerService);

  readonly bundesligaMatchState = signal<
    SliceState<{
      match: Match[];
      tournamentImage: string;
    }>
  >({
    loading: true,
    hasError: false,
  });

  ngOnInit() {
    this._bundesligaService
      .getBundesligaMatches()
      .pipe(
        take(1),
        finalize(() => {
          this.bundesligaMatchState.update((state) => ({
            ...state,
            loading: false,
          }));
        }),
      )
      .subscribe({
        next: (response) => {
          this.bundesligaMatchState.update((state) => ({
            ...state,
            data: {
              match: response.matches ?? [],
              tournamentImage: response.competition?.emblem ?? '',
            },
          }));
        },
        error: () => {
          this.bundesligaMatchState.update((state) => ({
            ...state,
            loading: false,
            hasError: true,
          }));
        },
      });
  }
}
