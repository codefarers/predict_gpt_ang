import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { PredictNavbar } from './predict-navbar';

import 'zone.js';
import 'zone.js/testing';

describe('PredictNavbar', () => {
  let component: PredictNavbar;
  let fixture: ComponentFixture<PredictNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictNavbar],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PredictNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
