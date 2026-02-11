import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedRoute } from './protected-route';

describe('ProtectedRoute', () => {
  let component: ProtectedRoute;
  let fixture: ComponentFixture<ProtectedRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
