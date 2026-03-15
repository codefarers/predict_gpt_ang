import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedRoute } from './protected-route';
import { provideHttpClient } from '@angular/common/http';
import { FootballControllerService } from '../../predict_http_api/getAllMatchesApi/services/footballController.service';
import 'zone.js';
import 'zone.js/testing';

describe('ProtectedRoute', () => {
  let component: ProtectedRoute;
  let fixture: ComponentFixture<ProtectedRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedRoute],
      providers: [FootballControllerService, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
