import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MockRegisterFormData} from './mockdata/mock-register-form-data';
import { AddressForm } from './models/address-form';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let addressDetails = new AddressForm();


  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registration form is valid', () => {
    component.registerForm.setValue(MockRegisterFormData);
    component.onSubmit();
  });

  it('registration form is invalid when empty', () => {
    addressDetails.city = '';
    addressDetails.address1 = '';
    addressDetails.address2 = '';
    addressDetails.state = '';
    addressDetails.zipcode = '';
    component.registerForm.setValue(addressDetails);
    component.onSubmit();
    expect(component.registerForm.invalid).toEqual(true);
  });

  it('registration form is invalid when zipcode not valid', () => {
    addressDetails.city = 'Kolkata';
    addressDetails.address1 = 'Nabapally, Batanagar, Maheshtala(M), Landmark - Bata Maidan and Stadium';
    addressDetails.address2 = '';
    addressDetails.state = 'west bengal';
    addressDetails.zipcode = '90';
    component.registerForm.setValue(addressDetails);
    component.onSubmit();
    expect(component.registerForm.invalid).toEqual(true);
  });
});
