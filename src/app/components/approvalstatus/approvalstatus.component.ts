import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-approvalstatus',
  templateUrl: './approvalstatus.component.html',
  styleUrls: ['./approvalstatus.component.css']
})
export class ApprovalstatusComponent implements OnInit {

  currRole = '';
  loggedUser = '';
  approval: Observable<Professor[]> | undefined;
  professorlist: Observable<Professor[]> | undefined;
  responses: Observable<any> | undefined;

  constructor(private _service: ProfessorService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.currRole = this.currRole.replace(/"/g, '');

    this.professorlist = this._service.getProfessorList();
    this.approval = this._service.getProfessorListByEmail(this.loggedUser);

    this.toggleViewsBasedOnRole();
  }

  toggleViewsBasedOnRole() {
    const adminApprovalElement = document.getElementById("adminapproval");
    const professorApprovalElement = document.getElementById("professorapproval");
  
    // Check if elements exist before trying to manipulate their styles
    if (adminApprovalElement && professorApprovalElement) {
      if (this.currRole === 'professor' || this.currRole === 'PROFESSOR') {
        adminApprovalElement.style.display = 'none';
        professorApprovalElement.style.display = 'block';
      } else if ((this.currRole === 'admin' || this.currRole === 'ADMIN') && this.loggedUser === 'admin@gmail.com') {
        adminApprovalElement.style.display = 'block';
        professorApprovalElement.style.display = 'none';
      }
    } else {
      console.error('Elements for approval view not found');
    }
  }
  

  updateButtonVisibility(accept: boolean, reject: boolean) {
    const acceptBtn = document.getElementById("acceptbtn");
    const rejectBtn = document.getElementById("rejectbtn");
    const acceptedBtn = document.getElementById("acceptedbtn");
    const rejectedBtn = document.getElementById("rejectedbtn");

    if (acceptBtn) acceptBtn.style.display = accept ? 'none' : 'block';
    if (rejectBtn) rejectBtn.style.display = reject ? 'none' : 'block';
    if (acceptedBtn) acceptedBtn.style.display = accept ? 'block' : 'none';
    if (rejectedBtn) rejectedBtn.style.display = reject ? 'block' : 'none';
  }

  acceptRequest(curremail: string) {
    this.responses = this._service.acceptRequestForProfessorApproval(curremail);
    this.updateButtonVisibility(true, false);
  }

  rejectRequest(curremail: string) {
    this.responses = this._service.rejectRequestForProfessorApproval(curremail);
    this.updateButtonVisibility(false, true);
  }

}