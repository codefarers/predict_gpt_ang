import { Component, inject, signal } from '@angular/core';
import {
  BundesligaMatchesControllerService
} from '../../../../predict_http_api/getAllMatchesApi/services/bundesligaMatchesController.service';
import { SliceState } from '../../models/models';
import { Match } from '../../../../predict_http_api';
import { finalize, take } from 'rxjs';
import { MatchesCard } from '../../compoonents/matches-card/matches-card';

@Component({
  selector: 'app-bundesliga-view',
  imports: [MatchesCard],
  template: `<app-matches-card [matchState]="bundesligaMatchState()">
  </app-matches-card>`,
  styles: ``,
})
export class BundesligaView {
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
