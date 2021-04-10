import { Component } from '@angular/core';
import { Category } from './shop/category/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sklep-app';

  categories = [];


  ngOnInit(): void {


  for (let i = 0; i < 5; i++) {

    let cat = new Category();
    cat.name = "kategoria";
    cat.id = i;
    this.categories.push(cat);
  }
}
}
