import { RouterTestingModule } from '@angular/router/testing';
import { ChangePasswordComponent } from './change-password.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService, MockAccountService } from '../services/account.service';
import { of, throwError } from 'rxjs';

//mock tests
//ng test
describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let mockAccountService: MockAccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      providers: [
        { provide: AccountService, useClass: MockAccountService }
      ]
    })
    .compileComponents();
  
    mockAccountService = TestBed.inject(AccountService) as unknown as MockAccountService;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle successful changePassword', () => {
    //looking for the alert to see if it was called
    spyOn(window, 'alert');
    spyOn(mockAccountService, 'changePassword').and.returnValue(of(null));
    component.changePassword();
    expect(window.alert).toHaveBeenCalledWith('Password updated successfully');
  });
});


