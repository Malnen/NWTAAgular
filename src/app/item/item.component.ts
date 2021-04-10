import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shop/item/Item';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  
})
export class ItemComponent implements OnInit {

  item :Item = new Item();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let itemId = Number(routeParams.get('itemId')); 
    //this.item = tu powinno być wczytanie itemka o itemId z bazy
    this.item.id=itemId;
    this.item.name = "nazwa"; // dane przykładowe, po połączeniu z bazą skasować
    this.item.price = 10.50;
    this.item.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit lorem eget tortor tincidunt, ut imperdiet leo pellentesque. Quisque volutpat, magna eu sollicitudin tristique, augue tortor placerat ante, a euismod massa erat a nibh. In scelerisque iaculis ligula a viverra. Mauris gravida nec quam quis aliquet. Duis bibendum nibh at erat malesuada, sed maximus libero pretium. Ut ac diam eget nulla pharetra feugiat sit amet nec metus. Curabitur ut auctor dolor. Ut a nisl libero. Vestibulum eget quam in libero sagittis tristique."

  }

}
