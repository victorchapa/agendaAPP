import { Injectable } from '@angular/core';
import { User, userInterface } from "../models/user.model";

@Injectable()

export class UserRegistrationService {

	private user: userInterface;
	private userCollection: userInterface[] = [];
	private userCollectionAtString: string;

	constructor() {
		if(window.localStorage.length !== 0){
			this.userCollection = JSON.parse(window.localStorage.getItem("usersRegistration"));
		}
	}

	public saveUser(user): void {
		this.user = new User(user);
		this.userCollection.push(this.user);
		this.saveAtStore();
	}

	public getUsers(): userInterface[] {
		return this.userCollection;
	}

	public updateUser(userUpdated: userInterface, index: string): void {
		this.userCollection[index] = userUpdated;
		this.saveAtStore();
	}

	public removeUser(index: string): void {
		this.userCollection.splice(parseInt(index), 1);
		this.saveAtStore();
	}

	public wipeAll(): void {
		window.localStorage.clear();
	}

	public createRandomUser(): void {
		let randomUser = {
			name: this.randomNames(this.randomizeNumber(7)),
			age: this.randomizeNumber(100),
			phone: Math.floor(1000000000 + Math.random() * 9000000000),
			email: this.randomizeStrings(this.randomizeNumber(15),"email"),
			relocation: true
		};
		this.saveUser(randomUser);
	}

	private saveAtStore(): void {
		this.userCollectionAtString = JSON.stringify(this.userCollection);
		window.localStorage.setItem("usersRegistration", this.userCollectionAtString);
	}

	private randomizeNumber(max: number): number{
		return (Math.floor(Math.random() * (max + 1)))
	}

	private randomNames(index: number): string {
		let names = ["Pepito", "Juanito", "Pancrasio", "Aquiles", "John", "Kylo", "Altaid"];
		return (names[index]);
	}

	private randomEmails(index: number) : string {
		let emails = ["@hotmail.com", "@gmail.com", "@prodigy.com", "@msn.com", "@yahoo.com"];
		return (emails[index]);
	}

	private randomizeStrings(length: number, kind: string) {
		let result = '';
		let characters = ''
		if (kind === "number") {
			characters = '0123456789';
		} else {
			characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		}
		
		let charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		if (kind === "email") {
			result = result + this.randomEmails(this.randomizeNumber(4))
		}

		return result;
	 }

}
