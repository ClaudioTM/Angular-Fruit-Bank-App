import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _updatePoints = "http://localhost:3000/api/updatePoints"
  private _displayItemUrl = "http://localhost:3000/api/displayItems"
  private _addItemUrl = "http://localhost:3000/api/addItem"
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _deleteItem = "http://localhost:3000/api/deleteItem/"
  constructor(private http: HttpClient,
    private _router: Router) { }

  registerUser(user: any) {
    console.log(user);
    return this.http.post(this._registerUrl, user)
  }

  loginUser(user: any) {
    return this.http.post(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getRole() {
    return localStorage.getItem('role')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getPoints() {
    return localStorage.getItem('points')
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('points')
    this._router.navigate(['/home'])
  }

  addItem(item: any) {
    console.log(item)
    return this.http.post<any>(this._addItemUrl, item)
  }

  getItems() {
    return this.http.get<any>(this._displayItemUrl)
  }

  claimItem(id: any) {
    console.log(id)
    return this.http.delete<any>(this._deleteItem + id)
  }

  // updatePoints(user: any) {
  //   return this.http.put<any>(this._updatePoints, user)
  // }
}
