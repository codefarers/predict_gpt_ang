import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesCard } from './matches-card';

describe('MatchesCard', () => {
  let component: MatchesCard;
  let fixture: ComponentFixture<MatchesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
