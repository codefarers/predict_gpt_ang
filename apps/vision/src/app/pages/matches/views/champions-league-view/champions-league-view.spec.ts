import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChampionsLeagueView } from './champions-league-view';

describe('ChampionsLeagueView', () => {
  let component: ChampionsLeagueView;
  let fixture: ComponentFixture<ChampionsLeagueView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionsLeagueView],
    }).compileComponents();

    fixture = TestBed.createComponent(ChampionsLeagueView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
