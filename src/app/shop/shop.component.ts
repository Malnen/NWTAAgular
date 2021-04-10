import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from './category/category';
import { Item } from './item/Item';
import { ActivatedRoute } from '@angular/router';
import { DataDownloaderService } from '../data-downloader.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss', '../app.component.scss']
})
export class ShopComponent implements OnInit {

  items = [];
  itemsExampleData = [];
  
  actualCategory: Category;

  constructor(private route: ActivatedRoute, private dataService: DataDownloaderService) {
    route.params.subscribe(val => {
      this.actualCategory = new Category();
      const routeParams = this.route.snapshot.paramMap;
      this.actualCategory.id = Number(routeParams.get('categoryId'));

      this.dataService.getCategoryById(this.actualCategory.id).subscribe((data: any) => {
        this.actualCategory.name = data.nazwa;
      })
      this.items = [];
      this.dataService.getItemsByCategory(this.actualCategory.id).subscribe((data: any) => {
        this.items = data;
      })
    });
  }


  ngOnInit(): void {
  }                                    


}

