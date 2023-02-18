import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'src/app/models/custom-validator';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  private customValidatorsMap = new Map<string, ValidatorFn>();
  zipcodeRegex = /^[0-9]{6}$/;
  stringOnlyRegx = /^[a-zA-Z]*$/;
  stringWithSpaceOnlyRegx = /^[A-Za-z\s]*$/;

  constructor() {
    this.buildCustomValidatorsMap();
  }
  
  buildCustomValidatorsMap() {
    this.customValidatorsMap.set('maxLength', CustomValidators.maxLength(256));
    this.customValidatorsMap.set('minLength', CustomValidators.minLength(2));
    this.customValidatorsMap.set(
      'zipcodeValidator',
      CustomValidators.zipcodeValidator(this.zipcodeRegex)
    );
    this.customValidatorsMap.set(
      'stringOnlyValidator',
      CustomValidators.patternValidator(this.stringOnlyRegx, {
        stringOnly: true,
      })
    );
    this.customValidatorsMap.set(
      'stringWithSpaceOnlyValidator',
      CustomValidators.patternValidator(this.stringWithSpaceOnlyRegx, {
        stringWithSpaceOnly: true,
      })
    );
  }

  customValidatorArray(fieldName: string, validators: string[]): ValidatorFn[] {
    const arr = [];
    for (const validator of validators) {
      if(validator === 'requiredValidator') {
        this.customValidatorsMap.set(
          'requiredValidator',
          CustomValidators.requiredValidator(fieldName)
        );
      }
      arr.push(this.customValidatorsMap.get(validator));
    }
    return arr as ValidatorFn[]; // type casting
  }
}
