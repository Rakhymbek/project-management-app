import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      let errorMessage = '';

      if (!value) return null;

      const hasMoreThanEightCharacters = value.trim().length >= 8;
      if (!hasMoreThanEightCharacters) {
        errorMessage += 'At least 8 characters.';
      }

      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);

      const hasLowerAndUpperCase = hasLowerCase && hasUpperCase;
      if (!hasLowerAndUpperCase) {
        errorMessage += 'A mixture of both uppercase and lowercase letters.';
      }

      const hasNumeric = /[0-9]+/.test(value);
      if (!hasNumeric) {
        errorMessage += 'A mixture of letters and numbers.';
      }

      const hasOneSpecialCharacter = /[$&+,:;=?@#|'<>.^*()%!-]+/.test(value);
      if (!hasOneSpecialCharacter) {
        errorMessage += 'Inclusion of at least one special character.';
      }

      const passwordValid =
        hasLowerAndUpperCase && hasMoreThanEightCharacters && hasNumeric && hasOneSpecialCharacter;

      return !passwordValid ? { passwordStrength: true, errorMessage } : null;
    };
  }
}
