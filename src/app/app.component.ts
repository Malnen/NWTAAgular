import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataDownloaderService } from './data-downloader.service';
import { LoginService } from './login.service';
import { Category } from './shop/category/category';
import { User } from './shop/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sklep-app';
  //isCategoryFirst: boolean[];

  categories = [];  // ZWIERZAKI, KARMA, ZABAWKI, INNE
  user = new User();
  loginButtonText = "Zaloguj";
  logged = false;
  userIsAdmin = false;

  constructor(private dataService: DataDownloaderService, public router: Router, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.loggedInSession();

  }

  loggedInSession(){
    this.dataService.getCategories().subscribe((data: any) => {
      this.fillCategoryName(data);
    })
    try {
      let sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      if (sessionUser != null) {
        this.user = sessionUser;
        //console.log(sessionUser);
        this.logged = true;
        if(this.user.role == 'admin')
          this.userIsAdmin = true;
      }
      if (this.user.login != null)
        this.loginButtonText = "Wyloguj";

    } catch (error) {
      console.log(error);
    }
    if (this.user.awatar == "")
      this.user.awatar = "../assets/images/profil.jpg";
  }
  fillCategoryName(data: any[]) {
    data.forEach(element => {

      let cat = new Category();
      cat.name = element.nazwa;
      cat.id = element.numerDzialu;
      this.categories.push(cat);


      // IKONY PRZY KATEGORIACH --------------
      if (cat.name == "Zwierzaki")           // zwierze
        cat.icon = "fas fa-dog";
      else if (cat.name == "Karma")      // karma
        cat.icon = "fas fa-cookie-bite";
      else if (cat.name == "Zabawki")      // zabawki
        cat.icon = "fas fa-paw"
      else                  // inne
        cat.icon = "fas fa-cat";
      // ------------------------------------


    });
  }
  loginLogout() {
    if (this.user.login == null) {
      this.router.navigate(['/login']);

    }
    else {
      sessionStorage.clear();
      this._document.defaultView.location.reload();
      this.loginButtonText = "Zaloguj";
    }
  }
}
