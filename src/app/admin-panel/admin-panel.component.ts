import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.checkIfAdmin();
  }

  addItemRoute() {
    this.checkIfAdmin();
    this.router.navigate(['/add-item']);
  }
  importRoute() {
    this.checkIfAdmin();
    this.router.navigate(['/import-data']);
  }
  exportRoute() {
    this.checkIfAdmin();
    this.router.navigate(['/export-data']);
  }

  checkIfAdmin() {
    let sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (sessionUser == null || sessionUser.role != 'admin') {
      this.router.navigate(['/shop']);
    }
  }
}
