import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userInterface } from "../models/user.model";
import { UserRegistrationService } from "../services/user-registration-service.service";
import { nameValidator } from '../utils/username.validator';
import { ageValidator } from '../utils/userage.validator';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

	public userForm: FormGroup;
	public submitted: boolean = false;
	public success: boolean = false;
	public editionMode: boolean = false;
	public maxLengthPassed: boolean = false;
	public maxLength: number = 19;

	@Input() userToEdit?: userInterface;
	
	constructor(
		private formBuilder: FormBuilder,
		private userService: UserRegistrationService
	) { }

	ngOnInit() {
		this.userForm = this.formBuilder.group({
			name: ['', [Validators.required, nameValidator]],
			age: ['', [Validators.required, ageValidator]],
			phone: ['', Validators.required,],
			email: ['', [Validators.required, Validators.email]],
			relocation: ['', Validators.required]
		});
		this.userToEdit !== undefined ? this.activeEditionMode() : false;
	}

	public onSubmit(): void {
		this.submitted = true;
		this.userForm.controls.phone.errors.maxLength;
		if (this.userForm.invalid) {
			return;
		}
		this.userService.saveUser(this.userForm.value);
		this.clearForm();
		this.success = true;
	}

	public getFormValue(): userInterface {
		return (this.userForm.value);
	}

	public checkAgeForRelocation(event: KeyboardEvent): void {
		let age = event.currentTarget['value'];
		if (age > 25 && age < 30) {
			this.userForm.controls.relocation.setValue(false);
		}
	}

	public preventKey(event: KeyboardEvent): void {
		event.preventDefault();
	}

	public applyPhoneMask(event: KeyboardEvent): void {
		var charCode = (event.which) ? event.which : event.keyCode;
		if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)) {
			let phoneChar = event.currentTarget['value'];
			event.currentTarget['value'] = event.key + event.currentTarget['value'];
			event.currentTarget['setSelectionRange'](0,0);
			switch(phoneChar.length){
				case 1:
				case 4:
					event.currentTarget['value'] = " " + event.currentTarget['value'];
					event.currentTarget['setSelectionRange'](0,0);
					break;
				case 7:
					event.currentTarget['value'] = ") " + event.currentTarget['value'];
					event.currentTarget['setSelectionRange'](0,0);
					break;
				case 12:
					event.currentTarget['value'] = " (" + event.currentTarget['value'];
					event.currentTarget['setSelectionRange'](0,0);
					break;
			}
			if(phoneChar.length > 13) {
				if (event.currentTarget['value'].indexOf("+") === -1) {
					event.currentTarget['value'] = "+" + event.currentTarget['value'];
				} else {
					event.currentTarget['value'] = event.currentTarget['value'].replace("+", event.key);
					event.currentTarget['value'] = "+" + event.currentTarget['value'];
				}
				event.currentTarget['setSelectionRange'](0,0);
				if (phoneChar.length >= 19) {
					this.maxLengthPassed = true;
				}
			}
        }
	}

	private clearForm(): void {
		let control: AbstractControl = null;
    	this.userForm.reset();
    	this.userForm.markAsUntouched();
    	Object.keys(this.userForm.controls).forEach((name) => {
      		control = this.userForm.controls[name];
      		control.setErrors(null);
    	});
	}

	private activeEditionMode(): void {
		this.editionMode = true;
		for (var [key] of Object.entries(this.userForm.controls)) {
			this.userForm.controls[key].setValue(this.userToEdit[key]);
		}
	}
  
}
