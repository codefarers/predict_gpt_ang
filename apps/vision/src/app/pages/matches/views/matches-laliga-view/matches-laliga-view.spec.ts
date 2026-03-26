import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesLaligaView } from './matches-laliga-view';

describe('MatchesLaligaView', () => {
  let component: MatchesLaligaView;
  let fixture: ComponentFixture<MatchesLaligaView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesLaligaView],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesLaligaView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
