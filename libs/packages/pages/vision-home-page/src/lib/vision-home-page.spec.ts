import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionHomePage } from './vision-home-page';

import 'zone.js';
import 'zone.js/testing';

describe('VisionHomePage', () => {
  let component: VisionHomePage;
  let fixture: ComponentFixture<VisionHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionHomePage],
    }).compileComponents();

    fixture = TestBed.createComponent(VisionHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
