import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { MatchesList } from './matches-list';

import 'zone.js';
import 'zone.js/testing';

describe('MatchesList', () => {
  let component: MatchesList;
  let fixture: ComponentFixture<MatchesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesList],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
