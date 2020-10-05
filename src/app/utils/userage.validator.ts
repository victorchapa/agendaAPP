import { AbstractControl } from '@angular/forms';
  
export function ageValidator(control: AbstractControl) {
    let age = parseInt(control.value);
    if (age >= 18 && age <= 45) {
        return null;
    }
    return { ageValid: true };
}
