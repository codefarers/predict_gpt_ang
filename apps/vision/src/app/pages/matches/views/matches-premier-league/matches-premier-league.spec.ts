import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesPremierLeague } from './matches-premier-league';

import 'zone.js';
import 'zone.js/testing';
import { provideHttpClient } from '@angular/common/http';


describe('MatchesPremierLeague', () => {
  let component: MatchesPremierLeague;
  let fixture: ComponentFixture<MatchesPremierLeague>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesPremierLeague],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPremierLeague);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
