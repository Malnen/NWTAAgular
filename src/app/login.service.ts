import { Injectable } from '@angular/core';
import { User } from './shop/user/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user = new User();

  constructor() { }

  setUser(user:any){
    this.user = user;
  }
  getUser(){
    return this.user;
  }
}
