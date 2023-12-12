import { RouterTestingModule } from '@angular/router/testing';
import { ChangeEmailComponent } from './change-email.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService, MockAccountService } from '../services/account.service';
import { of, throwError } from 'rxjs';

//mock tests
//ng test
describe('ChangeEmailComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;
  let mockAccountService: MockAccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmailComponent ],
      providers: [
        { provide: AccountService, useClass: MockAccountService }
      ]
    })
    .compileComponents();
  
    mockAccountService = TestBed.inject(AccountService) as unknown as MockAccountService;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle successful changeEmail', () => {
    //looking for the alert to see if it was called
    spyOn(window, 'alert');
    spyOn(mockAccountService, 'changeEmail').and.returnValue(of(null));
    component.changeEmail();
    expect(window.alert).toHaveBeenCalledWith('Password updated successfully');
  });
});


