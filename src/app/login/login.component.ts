import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataDownloaderService } from '../data-downloader.service';
import { md5 } from './md5/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginInput') loginInput: ElementRef;
  @ViewChild('passInput') passwordInput: ElementRef;




  constructor(private dataService: DataDownloaderService, public router: Router, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    let sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (sessionUser != null){
      this.router.navigate(['/shop']);
    }
  }

  login() {
    let login = this.loginInput.nativeElement.value;
    this.dataService.login(login).subscribe((data: any) => {

      if (data != null) {
        let password = this.passwordInput.nativeElement.value;
        if (data.haslo == md5(password)) {
          (document.querySelector('.wrongData') as HTMLElement).style.visibility = 'hidden';
          this.dataService.getOrderId(login).subscribe((orderId: any) => {
            
            data.orderId = orderId.numerKoszyka;
            sessionStorage.setItem("loggedUser", JSON.stringify(data));

            this._document.defaultView.location.reload();
          });


        }
        else {
          (document.querySelector('.wrongData') as HTMLElement).style.visibility = 'visible';
        }
      } else {
        (document.querySelector('.wrongData') as HTMLElement).style.visibility = 'visible';
      }
    })
  }

}
