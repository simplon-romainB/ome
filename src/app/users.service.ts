import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

register(email,password) {
this.http.post("https://peaceful-mountain-88307.herokuapp.com/db", { email: email, password: password}).subscribe(() => {
  console.log('Enregistrement terminé !');
  },
(error) => {
  console.log('Erreur ! : ' + error);
  });
}}