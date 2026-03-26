import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LigueOneView } from './ligue-one-view';

describe('LigueOneView', () => {
  let component: LigueOneView;
  let fixture: ComponentFixture<LigueOneView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigueOneView],
    }).compileComponents();

    fixture = TestBed.createComponent(LigueOneView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
