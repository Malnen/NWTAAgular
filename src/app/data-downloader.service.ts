import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataDownloaderService {

  private url = "https://nwtaspring.azurewebsites.net"; //na azure

  data = [];
  tables = [
    {
      key: "dzial",
      name: "Dzial"
    },
    {
      key: "kartaProduktow",
      name: "Karta Produktów"
    },
    {
      key: "klient",
      name: "Klient"
    },
    {
      key: "konto",
      name: "Konto"
    },
    {
      key: "koszyk",
      name: "Koszyk"
    },
    {
      key: "produkt",
      name: "Produkt"
    }, 
    {
      key: "transakcja",
      name: "Transakcja"
    }, 
    {
      key: "zoologicznypunktsprzedazy",
      name: "Zoologiczny Punkt Sprzedaży"
    }
  ]

  constructor(private http: HttpClient) { }

  getTables() {
    return this.tables
  }

  getCategories() {
    return this.http.get(this.url + "/dzial/all");
  }
  getCategoryById(id: number) {
    return this.http.get(this.url + "/dzial/" + id);
  }
  getItemsByCategory(categoryId: number) {
    return this.http.get(this.url + "/dzial/" + categoryId + "/produkt/all");
  }
  getItemById(id: number) {
    return this.http.get(this.url + "/produkt/" + id);
  }
  postItem(data) {
    return this.http.post<any>(this.url + "/produkt/add", data);
  }
  getOrderById(id: number) {
    return this.http.get(this.url + "/kartaProduktow/" + id);
  }
  getOrderId(login: string) {
    return this.http.get(this.url + "/koszyk/" + login);
  }
  login(login: string) {
    return this.http.get(this.url + "/konto/" + login);
  }
  register(data, _document: Document) {
    const body = data;
    return this.http.post<any>(this.url + "/konto/add", body);
  }
  addItemToOrder(data) {
    const body = data;
    return this.http.post<any>(this.url + "/kartaProduktow/add", body);

  }
  addOrderId(data) {
    let tmp = {
      kontoLoginKonta: data
    }
    console.log(tmp);
    return this.http.post<any>(this.url + "/koszyk/add", tmp);
  }
  deleteFromOrder(id) {

    return this.http.delete(this.url + "/kartaProduktow/" + id);
  }
  deleteOrder(orderId) {

    return this.http.delete(this.url + "/kartaProduktow/deleteProdukty/" + orderId);
  }
  importTable(name, file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.url + "/import/" + name, formData);
  }
  exportTable(name) {
    //console.log(this.url + "/" + name+ "/export");
    return this.http.get(this.url + "/" + name + "/export", { responseType: 'blob' });
  }
}
