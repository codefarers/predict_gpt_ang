import { Component, inject, signal, OnInit } from '@angular/core';

import { finalize, take } from 'rxjs';

import { LaLigaMatchControllerService } from '@vision/vision-http-ang';
import { Match } from '@vision/vision-http-ang';

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
