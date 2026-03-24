import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesPremierLeague } from './matches-premier-league';

describe('MatchesPremierLeague', () => {
  let component: MatchesPremierLeague;
  let fixture: ComponentFixture<MatchesPremierLeague>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesPremierLeague],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPremierLeague);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
