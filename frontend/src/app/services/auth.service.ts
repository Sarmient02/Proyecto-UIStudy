import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';


  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  signUp(user: any) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user: any){
    return this.http.post<any>(this.URL + '/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser(){
    return this.http.get<any>(this.URL + '/users');
  }

}
