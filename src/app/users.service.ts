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
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/login', { email, password});
    }

initArticles() {
  return this.http.get('https://peaceful-mountain-88307.herokuapp.com/articles');
}
initComments() {
  return this.http.get('https://peaceful-mountain-88307.herokuapp.com/comments');
}
newArticle(titre: string, article: string, token: string, categorie: string, image: string) {
  const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  const httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/postarticles',
    { titre, article, date, categorie, image}, httpOptions);

}

updateArticle(titre: string, article: string, token: string, id: number) {
  const httpOptions = {
    headers: new HttpHeaders({
       Authorization: `Bearer ${token}`
    })
  };
  return this.http.put('https://peaceful-mountain-88307.herokuapp.com/updatearticles', { titre, article, id}, httpOptions);
}
newComment(article: number, author: string, comment: string, token: string) {

  const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  const httpOptions = {
    headers: new HttpHeaders({
       Authorization: `Bearer ${token}`
    })
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/comments',
    { author, comment, article, date}, httpOptions);
}

deleteArticle(id: number, token: string) {
  const httpOptions = {
    headers: new HttpHeaders({
       Authorization: `Bearer ${token}`
    }),
  };
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/deletearticles', {id}, httpOptions);
}
sendContact(name: string, email: string, message: string) {
  return this.http.post('https://peaceful-mountain-88307.herokuapp.com/sendcontact',
    { name, email, message });
}
}
