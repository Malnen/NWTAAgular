import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataDownloaderService } from '../data-downloader.service';
import { Router } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PdfGenerator } from './pdf/PdfGenerator';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @ViewChild('firstNameInput') firstNameInput: ElementRef;
  @ViewChild('lastNameInput') lastNameInput: ElementRef;
  @ViewChild('countryInput') countryInput: ElementRef;
  @ViewChild('cityInput') cityInput: ElementRef;
  @ViewChild('adressInput') adressInput: ElementRef;
  @ViewChild('phoneInput') phoneInput: ElementRef;
  @ViewChild('nipInput') nipInput: ElementRef;

  items = [];
  totalToPaid = 0;
  shipping = "";
  everythingOk = true;
  ordered = false;
  isEmptyList = true;
  user = {
    name: "",
    orderId: 0
  };
  personData = {
    fName: "",
    lName: "",
    country: "",
    city: "",
    adress: "",
    phone: "",
    nip: ""
  };


  constructor(private dataService: DataDownloaderService, private router: Router) {
    let user = JSON.parse(sessionStorage.getItem("loggedUser"));
    this.user.name = user.login;
    this.user.orderId = user.orderId;



    if (user != null) {

      this.dataService.getOrderById(user.orderId).subscribe((data: any) => {

        data.forEach(element => {
          this.dataService.getItemById(element.produktIdProduktu).subscribe((itemData: any) => {
            itemData.numerKoszyka = element.numerKoszyka;
            itemData.iloscElementow = element.iloscElementow;
            itemData.cenaLacznie = element.iloscElementow * itemData.cena;
            this.totalToPaid += itemData.cenaLacznie;
            this.items.push(itemData);
            this.isEmptyList = false;
          });
          
        })

      });
 
    }
    else {

    }
  }

  ngOnInit(): void {

  }

  validate() {
    this.personData.fName = this.firstNameInput.nativeElement.value;
    this.personData.lName = this.lastNameInput.nativeElement.value;
    this.personData.country = this.countryInput.nativeElement.value;
    this.personData.city = this.cityInput.nativeElement.value;
    this.personData.adress = this.adressInput.nativeElement.value;
    this.personData.phone = this.phoneInput.nativeElement.value;
    this.personData.nip = this.nipInput.nativeElement.value;

    if (this.shipping == "" ||
      this.items.length == 0 ||
      this.personData.fName == "" ||
      this.personData.lName == "" ||
      this.personData.country == "" ||
      this.personData.city == "" ||
      this.personData.adress == "" ||
      this.personData.phone == "")
      this.everythingOk = false;
    else
      this.everythingOk = true;


    if (this.everythingOk)
      this.order();
  }

  order() {

    this.ordered = true;
    this.addShippingToBill();

    this.dataService.deleteOrder(this.user.orderId).subscribe(retData => {
    },
      error => {
      });


  }

  generatePDF() {
    let pdf = new PdfGenerator();
    pdf.generate(this.items, this.personData, this.totalToPaid);
  }

  addShippingToBill() {
    let cost = 0;
    switch (this.shipping) {
      case "gls": {
        cost = 15;
        break;
      }
      case "poczta": {
        cost = 20;
        break;
      }
      case "dpd": {
        cost = 18;
        break;
      }
    }

    let shipping = {
      nazwa: "Przesyłka: " + this.shipping,
      cena: cost,
      iloscElementow: 1,
      cenaLacznie: cost
    };
    this.totalToPaid += cost;
    this.items.push(shipping);
  }




}


