import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CloakService } from '../../core/auth/keyCloakService/keycloak-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockCloakService: jest.Mocked<CloakService>;

  beforeEach(async () => {
    mockCloakService = { login: jest.fn() } as unknown as jest.Mocked<CloakService>;

    await TestBed.configureTestingModule({
      imports: [LoginComponent], // standalone component must go here
      providers: [{ provide: CloakService, useValue: mockCloakService }],
      schemas: [NO_ERRORS_SCHEMA], // ignores styleUrl / templateUrl
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on Keycloak when loginWithKeycloak is called', () => {
    component.loginWithKeycloak();
    expect(mockCloakService.login).toHaveBeenCalledTimes(1);
  });
});
