import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { finalize, take } from 'rxjs';

import { GetTodayMatchesControllerService } from '../../../predict_http_api/getAllMatchesApi/services/getTodayMatchesController.service';
import { SliceState } from '../models/models';
import { Match } from '../../../predict_http_api';

@Component({
  selector: 'app-matches-list',
  imports: [DatePipe],
  templateUrl: './matches-list.html',
  styles: ``,
})
export class MatchesList implements OnInit {
  private _getTodayMatchesService = inject(GetTodayMatchesControllerService);

  readonly allMatchesState = signal<SliceState<{ match: Match[] } | undefined>>(
    {
      loading: true,
      hasError: false,
    },
  );

  isLoading = computed(() => this.allMatchesState().loading);
  hasError = computed(() => this.allMatchesState().hasError);
  todayMatches = computed(() => this.allMatchesState().data?.match);

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
            data: response.matches ? { match: response.matches } : undefined,
            loading: false,
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
