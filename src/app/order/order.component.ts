import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DataDownloaderService } from '../data-downloader.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  items = [];
  loggedUser = false;
  
  constructor(private dataService: DataDownloaderService,  @Inject(DOCUMENT) private _document: Document) {
    let user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (user != null) {
      this.loggedUser = true;
      this.dataService.getOrderById(user.orderId).subscribe((data: any) => {

        data.forEach(element => {
          this.dataService.getItemById(element.produktIdProduktu).subscribe((itemData: any) => {
            itemData.numerKarty = element.numerKarty;
            itemData.iloscElementow = element.iloscElementow;
            this.items.push(itemData);

          });
        })
      })
    }
    else {
      
    }
  }


  ngOnInit(): void {

  }
  deleteItem(id){

    this.dataService.deleteFromOrder(id).subscribe(retData => {
      //this._document.defaultView.location.reload();
    },
      error => {
        //console.log(error);
        this._document.defaultView.location.reload();
      })
  }
}
