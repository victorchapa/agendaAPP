import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserRegistrationService } from "../services/user-registration-service.service";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-extra-func',
  templateUrl: './extra-func.component.html',
  styleUrls: ['./extra-func.component.scss']
})

export class ExtraFuncComponent {

    @ViewChild("deleteAllModal") myModal: ElementRef;

    public closeResult: string;
    
    constructor(
        private userService: UserRegistrationService,
        private modalService: NgbModal
    ){ }

    public clearAllData(): void {
        this.openModal(this.myModal);
    }

    public removeAll(modalCallback: NgbActiveModal): void {
        this.userService.wipeAll();
        modalCallback.close("edit");
    }

    public addRandomUser(): void {
        this.userService.createRandomUser();   
    }
    
    private openModal(content: any): void {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
