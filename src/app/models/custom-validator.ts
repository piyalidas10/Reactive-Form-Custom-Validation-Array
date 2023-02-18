import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RequiredMsgFunc } from './common-functions';
import { ErrorMsg } from './error-msg';

export class CustomValidators {
  public static patternValidator(
    regex: RegExp,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control?.value?.trim() || control?.value?.trim().length === 0) {
        return null;
      }
      const valid: boolean =
        control?.value?.trim().length >= 1 &&
        this.isPatternMatched(regex, control.value);
      console.log('valid => ', this.isPatternMatched(regex, control.value));
      return valid ? null : error;
    };
  }
  public static isPatternMatched(regex: RegExp, controlValue: string): boolean {
    return regex.test(controlValue);
  }
  public static isSpaceAvailable(control: AbstractControl) {
    return (control.value || '').trim()?.length === 0;
  }
  public static maximumOneWhitespacePresent(control: AbstractControl) {
    return control.value.trim().indexOf('  ') === -1;
  }
  public static isValidYear(year: number) {
    const currentYear: number = new Date().getFullYear();
    if (year && currentYear >= year && year >= 1000) {
      return true;
    }
    return false;
  }
  public static mobileValidator(): ValidatorFn {
    const regex : RegExp = new RegExp('^\\d{10}$');
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && !this.isPatternMatched(regex, control.value)
        ? { url: ErrorMsg.MOBILE }
        : null;
    };
  }
  public static requiredValidator(fieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        control?.value == null ||
        (typeof control.value === 'string' && this.isSpaceAvailable(control))
      ) {
        return {
          required: { message: RequiredMsgFunc(fieldName).message },
        };
      }
      return null;
    };
  }
  public static urlValidator(): ValidatorFn {
    const regex : RegExp = new RegExp('(https?:\\/\\/)|(www\\.)');
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && !this.isPatternMatched(regex, control.value)
        ? { url: ErrorMsg.URL }
        : null;
    };
  }
  public static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && !this.isValidEmail(control.value)
        ? { email: ErrorMsg.EMAIL }
        : null;
    };
  }
  public static isValidEmail(email: string): boolean {
    const regx : RegExp = new RegExp(
      "^([\\w.\\-'/&])+@([\\w\\-])+\\.(\\w)([\\w.\\-])*$"
    );
    return regx.test(email);
  }
  public static yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = this.isValidYear(control.value);
      return isValid ? null : { year: ErrorMsg.YEAR };
    };
  }
  public static zipcodeValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && !this.isPatternMatched(regex, control.value)
        ? { zipcode: ErrorMsg.ZIP }
        : null;
    };
  }
  public static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value?.length < minLength
        ? { minLength: ErrorMsg.MINLENGTH }
        : null;
    };
  }
  public static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value?.lengt > maxLength
        ? { maxLength: ErrorMsg.MAXLENGTH }
        : null;
    };
  }
}
