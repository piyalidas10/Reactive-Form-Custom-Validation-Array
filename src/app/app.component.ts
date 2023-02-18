import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AddressForm } from './models/address-form';
import { FormValidatorService } from './services/form-validator/form-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  addressDetails: AddressForm;
  submitted = false;
  showError: boolean = false;
  showZipCode: boolean = false;
  selectedCountryCode: string | undefined;

  constructor(private formValidatorService: FormValidatorService) {
    this.addressDetails = new AddressForm();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup({
      city: new FormControl(this.addressDetails.city),
      address1: new FormControl(this.addressDetails.address1),
      address2: new FormControl(this.addressDetails.address2),
      state: new FormControl(this.addressDetails.state),
      zipcode: new FormControl(this.addressDetails.zipcode),
    });
    console.log(this.registerForm);
    this.validateControls();
  }

  validateControls() {
    const city = this.registerForm.get('city') as FormControl;
    const address1 = this.registerForm.get('address1') as FormControl;
    const address2 = this.registerForm.get('address2') as FormControl;
    const state = this.registerForm.get('state') as FormControl;
    const zipcode = this.registerForm.get('zipcode') as FormControl;

    city.setValidators(
      this.formValidatorService.customValidatorArray('city', [
        'requiredValidator',
        'stringWithSpaceOnlyValidator',
      ])
    );
    address1.setValidators(
      this.formValidatorService.customValidatorArray('address1', ['requiredValidator'])
    );
    state.setValidators(
      this.formValidatorService.customValidatorArray('state', [
        'requiredValidator',
        'stringWithSpaceOnlyValidator',
      ])
    );
    zipcode.setValidators(
      this.formValidatorService.customValidatorArray('zipcode', [
        'requiredValidator',
        'zipcodeValidator',
      ])
    );
  }

  onSubmit() {
    this.submitted = true;
    console.log('registerForm => ', this.registerForm);
    this.checkRequiredFields(this.registerForm.controls);
    if (this.registerForm.invalid) {
      this.showError = true;
      return false;
    }
    this.showError = false;
    return true;
  }

  checkRequiredFields(formControls: {
    [key: string]: AbstractControl;
  }) {
    Object.keys(formControls).forEach((formControlKey) => {
      if (formControls[formControlKey]?.errors?.required) {
        this.formControlMarkAsTouched(formControlKey);
      }
    });
  }

  formControlMarkAsTouched(formControlKey: string) {
    this.registerForm.controls[formControlKey].markAsTouched();
  }
}
