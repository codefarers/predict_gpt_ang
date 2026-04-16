import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloakService } from '../../core/auth/keyCloakService/keycloak-service';
import 'zone.js';
import 'zone.js/testing';

import { LogoutScreen } from './logout-screen';

describe('LogoutScreen', () => {
  let component: LogoutScreen;
  let fixture: ComponentFixture<LogoutScreen>;
  let mockCloakService: jest.Mocked<CloakService>;

  beforeEach(async () => {
    mockCloakService = {
      logout: jest.fn(),
    } as unknown as jest.Mocked<CloakService>;

    await TestBed.configureTestingModule({
      imports: [LogoutScreen],
      providers: [{
        provide: CloakService, useValue: mockCloakService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
