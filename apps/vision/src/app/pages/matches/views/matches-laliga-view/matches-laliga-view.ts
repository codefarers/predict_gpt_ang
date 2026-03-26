import { Component, inject, signal } from '@angular/core';
import { MatchesCard } from '../../compoonents/matches-card/matches-card';
import { SliceState } from '../../models/models';
import { Match } from '../../../../predict_http_api';
import {
  LaLigaMatchControllerService
} from '../../../../predict_http_api/getAllMatchesApi/services/laLigaMatchController.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-matches-laliga-view',
  imports: [MatchesCard],
  template: `<app-matches-card [matchState]="laLigaMatchState()">
  </app-matches-card>`,
  styles: ``,
})
export class MatchesLaligaView {
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
