import { Component, inject, OnInit } from '@angular/core';
import { FootballControllerService } from '../../predict_http_api/getAllMatchesApi/services/footballController.service';
import 'zone.js';
import 'zone.js/testing';
import { MatchesResponse } from '../../predict_http_api';

@Component({
  selector: 'app-main-page',
  imports: [],
  template: ` <h1>Main Page</h1> `,
})
export class MainPage implements OnInit {
  footballService = inject(FootballControllerService);

  ngOnInit() {
    this.loadMatches();
  }

  matches?: MatchesResponse;

  loadMatches() {
    this.footballService.getMatches().subscribe({
      next: (res: MatchesResponse) => (console.log(res)),
      error: (err) => console.error('Failed to fetch matches', err),
    });
  }
}
