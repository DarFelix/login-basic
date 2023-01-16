import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000'

  constructor( private http: HttpClient, private router:Router) { }

  signUp(user: any){
    return this.http.post(this.URL + '/signup', user);
  }

  signIn(user: any){
    return this.http.post(this.URL + '/signin', user);
  }

  loggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  getToken(){
    let val = localStorage.getItem('token');
    
    return val;
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
