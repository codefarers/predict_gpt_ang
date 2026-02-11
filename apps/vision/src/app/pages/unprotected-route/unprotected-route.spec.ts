import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprotectedRoute } from './unprotected-route';

describe('UnprotectedRoute', () => {
  let component: UnprotectedRoute;
  let fixture: ComponentFixture<UnprotectedRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnprotectedRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnprotectedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
