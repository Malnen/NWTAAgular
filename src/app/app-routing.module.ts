import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './admin-panel/add-item/add-item.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ImportDataComponent } from './admin-panel/import-data/import-data.component';
import { ExportDataComponent } from './admin-panel/export-data/export-data.component';
import { InfoComponent } from './info/info.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'order', component: OrderComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'item/:itemId', component: ItemComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'import-data', component: ImportDataComponent },
  { path: 'export-data', component: ExportDataComponent },
  { path: 'shop/category/:categoryId', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
