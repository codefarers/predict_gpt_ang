import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { FootballMatches } from './football-matches';

import 'zone.js';
import 'zone.js/testing';

describe('FootballMatches', () => {
  let component: FootballMatches;
  let fixture: ComponentFixture<FootballMatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballMatches],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FootballMatches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
