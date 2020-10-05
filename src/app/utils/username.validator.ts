import { AbstractControl } from '@angular/forms';
  
export function nameValidator(control: AbstractControl) {
    if (control.value) {
        let countingWords = control.value.split(" ");
        let totalWords = 4;
        if (countingWords.length === totalWords) {
            let wordsCorrectLengths = countingWords.filter(word => word.length >= 3 && word.length <= 5);
            let regex1 = /([aoupm])\w+/g;
            let regex2 = /([asdfghjklopuytem])\w+/g;
            let regex3 = /([aeou0-9])\w+/g;
            let regex4 = /([t])\w+/g;
            let firstWordCorrect = countingWords[0].match(regex1) === null ? true: false;
            let secondWordCorrect = countingWords[1].match(regex2) !== null ? true : false;
            let thirdWordCorrect  = countingWords[2].match(regex3) !== null ? true : false;
            let fourthWordCorrect = countingWords[3].match(regex4) !== null ? true : false;
            if (wordsCorrectLengths.length === totalWords) {
                if (firstWordCorrect && secondWordCorrect && thirdWordCorrect && fourthWordCorrect) {
                    return null;
                }
        }
    }
        return { nameValid: true };
    }
}
