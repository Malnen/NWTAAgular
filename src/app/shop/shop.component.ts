import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from './category/category';
import { Item } from './item/Item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss', '../app.component.scss']
})
export class ShopComponent implements OnInit {

  items = [];
  itemsExampleData = [];
  
  actualCategory: Category;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.actualCategory = new Category();
      const routeParams = this.route.snapshot.paramMap;
      this.actualCategory.id = Number(routeParams.get('categoryId'));

      this.items = [];
      //this.actualCategory = tu select do bazy o 'this.actualCategory'
      //this.items = tu select do bazy o rzeczy z kategorii 'this.actualCategory'
      

      this.itemsExampleData.forEach(element => {    //lista uzupełniana z listy losowych rzeczy , później po połączeniu skasować
        if (element.categoryId == this.actualCategory.id)
          this.items.push(element);
      });


    });
  }


  ngOnInit(): void {

    this.getExampleData();              //, później po połączeniu skasować

    //this.categories = tu select do bazy o  kategorie

  }                                     //zrobić wyszukiwanie i sortowanie

  getExampleData(): void {              //zapelniam losowymi danymi, później po połączeniu skasować
    for (let i = 0; i < 30; i++) {
      let item = new Item();
      item.name = "itemek";
      item.id = i;
      item.categoryId = i % 4;
      item.price = i + 1;
      this.itemsExampleData.push(item);

    }
  }


}

