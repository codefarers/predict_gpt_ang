import { Component, inject, OnInit } from '@angular/core';
import { FootballControllerService } from '../../predict_http_api/getAllMatchesApi/services/footballController.service';
import { MatchesResponse } from '../../predict_http_api';

@Component({
  selector: 'app-protected-route',
  templateUrl: './protected-route.html',
  styles: ``,
})
export class ProtectedRoute implements OnInit {
  private footballService = inject(FootballControllerService);

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    this.footballService
      .getMatches('body') // ensure only body is returned
      .subscribe({
        next: (res: MatchesResponse) => console.log('Matches:', res),
        error: (err) => console.error('Failed to fetch matches', err),
      });
  }
}
