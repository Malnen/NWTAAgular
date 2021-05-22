import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataDownloaderService } from '../data-downloader.service';
import { Item } from '../shop/item/Item';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  
})
export class ItemComponent implements OnInit {

  @ViewChild('itemNumberInput') itemsNumberInput: ElementRef;
  item = new Item();
  addedToOrder=false;
  loggedUser = false;

  constructor(private route: ActivatedRoute, private dataService: DataDownloaderService, public datepipe: DatePipe) { 
    let user = JSON.parse(sessionStorage.getItem("loggedUser"));
    
    if (user != null)
      this.loggedUser = true;
    
    const routeParams = this.route.snapshot.paramMap;
    let itemId = Number(routeParams.get('itemId')); 

    this.dataService.getItemById(itemId).subscribe((data: any) => {
      this.item = data;
    })

  }

  ngOnInit(): void {

  }

  addToOrder(){
    let date = new Date();
    let formatedDate =this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss');
    let numberOfItemsStr = this.itemsNumberInput.nativeElement.value;
    let user = JSON.parse(sessionStorage.getItem("loggedUser"));

    let item = {
      iloscElementow: numberOfItemsStr*1,
      koszykNumerKoszyka: user.orderId,
      produktIdProduktu: this.item.idProduktu,
      dataDodania: formatedDate
    }
    this.dataService.addItemToOrder(item).subscribe((data: any) => {
    
    },
    error => {
      this.addedToOrder = true;
    });
  }

}
