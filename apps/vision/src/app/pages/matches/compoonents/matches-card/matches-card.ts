import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SliceState } from '../../models/models';
import { Match } from '../../../../predict_http_api';
import { MATCH_STATUS } from '../../helpers/enum';

@Component({
  selector: 'app-matches-card',
  imports: [DatePipe],
  template: `
    @if (isLoading()) {
      <div class="spinner-border text-success" role="status">
        <span class="sr-only"></span>
      </div>
    } @else if (soccerMatches()?.length) {
      <div class="row">
        @for (matches of soccerMatches(); track matches.id) {
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
    }
  `,
})
export class MatchesCard {
  matchState = input.required<
    SliceState<{
      match?: Match[];
      tournamentImage?: string;
    }>
  >();

  state = computed(() => this.matchState());
  premierLeagueImage = computed(
    () => this.state()?.data?.tournamentImage ?? '',
  );
  isLoading = computed(() => this.state().loading);
  hasError = computed(() => this.state().hasError);
  soccerMatches = computed(() => this.state().data?.match);

  matchStatus = MATCH_STATUS;
}
