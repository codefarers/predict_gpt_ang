import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { CloakService } from './keycloak-service';

describe('KeycloakService', () => {
  let service: CloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideHttpClient()],
    });
    service = TestBed.inject(CloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
