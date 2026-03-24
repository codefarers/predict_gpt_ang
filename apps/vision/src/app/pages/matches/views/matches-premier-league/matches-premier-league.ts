import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { finalize, take } from 'rxjs';
import { FootballControllerService } from '../../../../predict_http_api/getAllMatchesApi/services/footballController.service';
import { SliceState } from '../../models/models';
import { Match } from '../../../../predict_http_api';
import { MATCH_STATUS } from '../../helpers/enum';

@Component({
  selector: 'app-matches-premier-league',
  imports: [DatePipe],
  template: ` @if (isLoading()) {
      <div class="spinner-border text-success" role="status">
        <span class="sr-only"></span>
      </div>
    } @else if (premierLeagueGames()?.length) {
      <div class="row">
        @for (matches of premierLeagueGames(); track matches.id) {
          <div class="col-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      class="team-logo-image"
                      alt="premier league emblem"
                      [src]="premierLeagueImage()"
                    />
                    <p>Matchweek {{ matches?.matchday }}</p>
                  </div>
                  @if (matches?.status === matchStatus.finished) {
                    <div class="bg-danger-subtle border rounded p-1">
                      <small>Completed</small>
                    </div>
                  } @else {
                    <div class="bg-light border rounded p-1">
                      <small>{{ matches?.utcDate | date: 'medium' }}</small>
                    </div>
                  }
                </div>
                <div
                  class="d-flex justify-content-between py-4 align-items-center"
                >
                  <!--                  homne team-->

                  <div
                    class="d-flex align-items-center justify-content-between gap-5"
                  >
                    <div>
                      <div class="d-flex justify-content-center w-100">
                        <img
                          class="team-logo-image"
                          alt="home team logo"
                          [src]="matches?.homeTeam?.crest"
                        />
                      </div>
                      <small>{{ matches?.homeTeam?.shortName }}</small>
                    </div>
                    @if (matches?.status === matchStatus.finished) {
                      <h1>{{ matches?.score?.fullTime?.home }}</h1>
                    }
                  </div>
                  <span class="fw-bolder">{{
                    matches?.status === matchStatus.finished ? '-' : 'vs'
                  }}</span>

                  <!--                  away team-->

                  <div
                    class="d-flex align-items-center justify-content-between gap-5"
                  >
                    @if (matches?.status === matchStatus.finished) {
                      <h1>{{ matches?.score?.fullTime?.away }}</h1>
                    }
                    <div>
                      <div class="d-flex justify-content-center w-100">
                        <img
                          class="team-logo-image"
                          alt="away team logo"
                          [src]="matches?.awayTeam?.crest"
                        />
                      </div>
                      <p>{{ matches?.awayTeam?.shortName }}</p>
                    </div>
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
                    <small class="text-muted ms-1">{{
                      matches.status === matchStatus.finished
                        ? 'Game Ended'
                        : 'Sky Sports'
                    }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    } @else if (hasError()) {
      <small>something went wrong!</small>
    } @else {
      <small>No matches today!</small>
    }`,
})
export class MatchesPremierLeague implements OnInit {
  private _premierLeagueMatchService = inject(FootballControllerService);

  readonly premierLeagueMatchState = signal<
    SliceState<{
      match: Match[];
      premierLeagueImage: string;
    }>
  >({
    loading: true,
    hasError: false,
  });
  premierLeagueImage = computed(
    () => this.premierLeagueMatchState().data?.premierLeagueImage ?? '',
  );

  premierLeagueGames = computed(
    () => this.premierLeagueMatchState().data?.match,
  );
  isLoading = computed(() => this.premierLeagueMatchState().loading);
  hasError = computed(() => this.premierLeagueMatchState().hasError);

  matchStatus = MATCH_STATUS;

  ngOnInit() {
    this._premierLeagueMatchService
      .getMatches()
      .pipe(
        take(1),
        finalize(() => {
          this.premierLeagueMatchState.update((state) => ({
            ...state,
            loading: false,
          }));
        }),
      )
      .subscribe({
        next: (response) => {
          this.premierLeagueMatchState.update((state) => ({
            ...state,
            data: {
              match: response.matches ?? [],
              premierLeagueImage: response.competition?.emblem ?? '',
            },
          }));
        },
        error: () => {
          this.premierLeagueMatchState.update((state) => ({
            ...state,
            loading: false,
            hasError: true,
          }));
        },
      });
  }
}
