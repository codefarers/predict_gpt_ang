import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { finalize, take } from 'rxjs';

import { GetTodayMatchesControllerService } from '../../../../predict_http_api/getAllMatchesApi/services/getTodayMatchesController.service';
import { SliceState } from '../../models/models';
import { Match } from '../../../../predict_http_api';

@Component({
  selector: 'app-matches-list',
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="spinner-border text-success" role="status">
        <span class="sr-only"></span>
      </div>
    } @else if (todayMatches()) {
      @for (matches of todayMatches(); track matches.id) {
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="bi bi-trophy"></i>
                    Matchweek 12
                  </div>
                  <div class="bg-secondary-subtle rounded p-1">
                    <small>Today 20:00</small>
                  </div>
                </div>
                <div class="d-flex justify-content-between py-4">
                  <div class="d-flex flex-column">
                    <img src="" alt="team picture" />
                    <small>Arsenal</small>
                  </div>
                  <span>vs</span>
                  <div class="d-flex flex-column">
                    <img src="" alt="team picture" />
                    <small>Chelsea</small>
                  </div>
                </div>
                <hr class="my-2" />
                <div class="d-flex justify-content-between">
                  <div class="text-center">
                    <i class="bi bi-geo-alt"></i>
                    <small class="text-muted ms-1">Emirates Stadium</small>
                  </div>
                  <div class="text-center">
                    <i class="bi bi-tv"></i>
                    <small class="text-muted ms-1">Sky sports</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    } @else if (hasError()) {
      <small>something went wrong!</small>
    } @else {
      <small>No matches today!</small>
    }
  `,
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
