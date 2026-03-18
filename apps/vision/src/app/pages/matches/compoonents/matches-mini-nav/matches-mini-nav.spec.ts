import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesMiniNav } from './matches-mini-nav';

import 'zone.js';
import 'zone.js/testing';

describe('MatchesMiniNav', () => {
  let component: MatchesMiniNav;
  let fixture: ComponentFixture<MatchesMiniNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesMiniNav],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesMiniNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
