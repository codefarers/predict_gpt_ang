import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { LigueOneView } from './ligue-one-view';
import 'zone.js';
import 'zone.js/testing';

describe('LigueOneView', () => {
  let component: LigueOneView;
  let fixture: ComponentFixture<LigueOneView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigueOneView],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LigueOneView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
