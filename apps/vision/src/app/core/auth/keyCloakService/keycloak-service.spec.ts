import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  FootballControllerService
} from '../../../predict_http_api/getAllMatchesApi/services/footballController.service';

import { CloakService } from './keycloak-service';

describe('KeycloakService', () => {
  let service: CloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballControllerService, provideHttpClient()],
    });
    service = TestBed.inject(CloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
