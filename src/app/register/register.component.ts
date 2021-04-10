import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataDownloaderService } from '../data-downloader.service';
import { md5 } from '../login/md5/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('loginInput') loginInput: ElementRef;
  @ViewChild('passInput') passwordInput: ElementRef;
  @ViewChild('mailInput') mailInput: ElementRef;
  @ViewChild('avatarInput') avatarInput: ElementRef;

  registerError = {
    login: false,
    password: false,
    mail: false,
    usrExist: false
  }

  constructor(private dataService: DataDownloaderService, public router: Router, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    let sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (sessionUser != null)
      this.router.navigate(['/shop']);
  }

  register() {
    let login = this.loginInput.nativeElement.value;
    let password = this.passwordInput.nativeElement.value;
    let mail = this.mailInput.nativeElement.value;
    let avatar = this.avatarInput.nativeElement.value;

    let user = {
      login: login,
      haslo: password,
      email: mail,
      awatar: avatar
    }

    if (this.validateUser(user)) {
      this.dataService.login(login).subscribe((data: any) => {
        if (data == null) {
          user.haslo = md5(user.haslo);
          this.registerError.usrExist = false;

          //sessionStorage.setItem("loggedUser", JSON.stringify(user));

          this.dataService.register(user, this._document).subscribe(retData => {
            //this._document.defaultView.location.reload();
          },
            error => {
              this.dataService.addOrderId(user.login).subscribe(retData => {
                //this._document.defaultView.location.reload();
              },
                error => {
                  this.dataService.getOrderId(user.login).subscribe((orderId: any) => {
                    let sessionUser = {
                      login: user.login,
                      haslo: user.haslo,
                      email: user.email,
                      awatar: user.awatar,
                      orderId: orderId.numerKoszyka
                    }                    
                    sessionStorage.setItem("loggedUser", JSON.stringify(sessionUser));



                    this._document.defaultView.location.reload();  // gdy strona zwraca error 200 "ok" odswieżamy stronę
                  });
                  //_document.defaultView.location.reload();  // gdy strona zwraca error 200 "ok" odswieżamy stronę
                });


            });



          // this.dataService.addOrderId(user.login);
        }
        else
          this.registerError.usrExist = true;
      })
    }


  }
  validateUser(user: any): boolean {
    let pass = true;

    let mailRegex = new RegExp('[a-z]+[@][a-z]+[.][a-z]+');

    if (user.login == "") {
      pass = false;
      this.registerError.login = true;
    }
    else this.registerError.login = false;
    if (user.haslo == "") {
      pass = false;
      this.registerError.password = true;
    }
    else this.registerError.password = false;
    if (!mailRegex.test(user.email)) {
      pass = false;
      this.registerError.mail = true;
    }
    else this.registerError.mail = false;

    return pass;
  }

}
