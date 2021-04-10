import { Component } from '@angular/core';
import { Category } from './shop/category/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sklep-app';
  isCategoryFirst: boolean[];

  categories = [];  // ZWIERZAKI, KARMA, ZABAWKI, INNE



  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {

      let cat = new Category();
      cat.name = "kategoria";
      cat.id = i;
                  
      // IKONY PRZY KATEGORIACH --------------
        if (i == 0)           // zwierze
          cat.icon = "fas fa-dog";  
        else if (i == 1)      // karma
          cat.icon = "fas fa-cookie-bite";
        else if (i == 2)      // zabawki
          cat.icon = "fas fa-paw"         
        else                  // inne
          cat.icon = "fas fa-cat";
      // ------------------------------------

      this.categories.push(cat);
    }
  }
}
