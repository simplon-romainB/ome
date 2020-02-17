import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {formatDate} from '@angular/common';

import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

register(email: string, password: string) {
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/db', { email, password});
}



login(email: string, password: string) {
  const optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/login', { email, password}, optionRequete);

    }
initArticles() {

  const optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  return this.http.get('https://peaceful-mountain-88307.herokuapp.com/articles', optionRequete);
}
initComments() {
  const optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  return this.http.get('https://peaceful-mountain-88307.herokuapp.com/comments', optionRequete);
}
newArticle(titre: string, article: string, token: string, categorie: string, image: string) {
  const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*'
    })
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/postarticles',
    { titre, article, date, categorie, image}, httpOptions);

}

updateArticle(titre: string, article: string, token: string, id: number) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
       Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    })
  };
  return this.http.put('https://peaceful-mountain-88307.herokuapp.com/updatearticles', { titre, article, id}, httpOptions);
}
newComment(article: string, author: string, comment: string, token: string) {

  const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
       Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*'
    })
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/comments',
    { author, comment, article, date}, httpOptions).subscribe(r => {});
}

deleteArticle(id: number, token: string) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
       Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*'
    }),
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/deletearticles', {id}, httpOptions);
}
sendContact(name: string, email: string, message: string) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'

    })
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/sendcontact',
    { name, email, message }, httpOptions).subscribe(r => {});
}
}
