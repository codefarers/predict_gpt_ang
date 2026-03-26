import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { BundesligaView } from './bundesliga-view';

import 'zone.js';
import 'zone.js/testing';

describe('BundesligaView', () => {
  let component: BundesligaView;
  let fixture: ComponentFixture<BundesligaView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BundesligaView],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(BundesligaView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
