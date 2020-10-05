import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserRegistrationService } from "./services/user-registration-service.service";
import { userInterface } from "./models/user.model";
import { ModalDismissReasons, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'app-root',
  	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {

	@ViewChild("myModal") myModal: ElementRef;

  	public userCollection: userInterface[];
	public tableHeaders: string[] = ["avatar", "name", "age", "email", "actions"];
	public closeResult: string;
	public selectedUser: userInterface;
	public deleteMode: boolean = false;

	private userIndex: string = '';
     
     constructor(
		private userService: UserRegistrationService,
		private modalService: NgbModal
     ){ }
     
     ngOnInit(){
		this.userCollection = this.userService.getUsers();
     }

     public editUser(event): void {
		this.userIndex = event.currentTarget.attributes["data-index"].value;
		this.selectedUser = this.userCollection[this.userIndex];
		this.openModal(this.myModal);
	}
	
	public updateUser(userUpdated: userInterface, modalCallback: NgbActiveModal): void {
		this.userService.updateUser(userUpdated, this.userIndex);
		modalCallback.close("edit");
	}

     public showRemoveAlert(event): void {
		this.deleteMode = true;
		this.userIndex = event.currentTarget.attributes["data-index"].value;
		this.selectedUser = this.userCollection[this.userIndex];
		this.openModal(this.myModal);
	}

	public removeUser(modalCallback: NgbActiveModal){
		this.userService.removeUser(this.userIndex);
		modalCallback.close("remove");
	}

	public returnAvatar(avatarNumber: number): string {
		return ("avatar-displayer-30 avatar-"+ avatarNumber);
	}
	
	private openModal(content: any): void {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			this.deleteMode = false;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			this.deleteMode = false;
		});
	}
	
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  	return 'by clicking on a backdrop';
		} else {
		  	return  `with: ${reason}`;
		}
	}

}
