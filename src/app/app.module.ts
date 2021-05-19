import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { ShopComponent } from './shop/shop.component';
import { ItemComponent } from './item/item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { DatePipe } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { FormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddItemComponent } from './admin-panel/add-item/add-item.component';
import { ImportDataComponent } from './admin-panel/import-data/import-data.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    LoginComponent,
    InfoComponent,
    ShopComponent,
    ItemComponent,
    RegisterComponent,
    SummaryComponent,
    AdminPanelComponent,
    AddItemComponent,
    ImportDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }