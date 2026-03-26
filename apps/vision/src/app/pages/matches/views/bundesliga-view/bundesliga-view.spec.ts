import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BundesligaView } from './bundesliga-view';

describe('BundesligaView', () => {
  let component: BundesligaView;
  let fixture: ComponentFixture<BundesligaView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BundesligaView],
    }).compileComponents();

    fixture = TestBed.createComponent(BundesligaView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
