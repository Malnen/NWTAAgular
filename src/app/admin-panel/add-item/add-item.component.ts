import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataDownloaderService } from 'src/app/data-downloader.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('descriptionInput') descriptionInput: ElementRef;
  @ViewChild('costInput') costInput: ElementRef;
  @ViewChild('photoInput') photoInput: ElementRef;

  categories = [];
  choosenCategory = "";
  done = false;

  constructor(public router: Router, private dataService: DataDownloaderService) { }

  ngOnInit(): void {
    this.checkIfAdmin();

    this.dataService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
      console.log(categories);
    });


  }

  validate() {
    this.checkIfAdmin();
    let item = {
      nazwa: this.nameInput.nativeElement.value,
      opis: this.descriptionInput.nativeElement.value,
      cena: this.costInput.nativeElement.value,
      zdjecieProduktu: this.photoInput.nativeElement.value,
      dzialNumerDzialu: this.choosenCategory
    };
    console.log(item);
    
    if (!(item.nazwa == "" ||
        item.opis == "" ||
        item.cena == "" ||
        item.zdjecieProduktu == "" ||
        item.dzialNumerDzialu == "")){
          this.checkIfAdmin();
          this.dataService.postItem(item).subscribe((categories: any) => {
            this.done = true;
          },
          error => {
            this.done = true;
          });
        }

  }

  checkIfAdmin() {
    let sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (sessionUser == null || sessionUser.role != 'admin') {
      this.router.navigate(['/shop']);
    }
  }
}
