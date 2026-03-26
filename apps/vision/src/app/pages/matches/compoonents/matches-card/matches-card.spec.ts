import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesCard } from './matches-card';
import { signal } from '@angular/core';

describe('MatchesCard', () => {
  let component: MatchesCard;
  let fixture: ComponentFixture<MatchesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesCard);
    component = fixture.componentInstance;
    component.matchState = signal({
      data: null,
      loading: false,
      hasError: false,
    }) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
