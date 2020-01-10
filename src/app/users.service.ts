import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule,HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

register(email,password) {
  const optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
this.http.post("https://peaceful-mountain-88307.herokuapp.com/db", { email: email, password: password}, optionRequete).subscribe(() => {
  console.log('Enregistrement terminé !');
  },
(error) => {
  console.log('Erreur ! : ' + error);
  });
}

login(email,password) {
  const optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/login", { email: email, password: password}, optionRequete)

    }
initArticles() {

  const optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'mon-entete-personnalise':'maValeur'
    })
  };
  {return this.http.get("https://peaceful-mountain-88307.herokuapp.com/articles", optionRequete);
  
  }
}
initComments() {
  const optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
  {return this.http.get("https://peaceful-mountain-88307.herokuapp.com/comments", optionRequete);
  
  }
}
newArticle(titre,article,token) {
  
  let date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*'
    })
  };
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/postarticles", { titre: titre, article: article, date: date},httpOptions).subscribe(r=>{})

}

updateArticle(titre,article,token,id) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    })
  };
    return this.http.put("https://peaceful-mountain-88307.herokuapp.com/updatearticles", { titre: titre, article: article, id: id},httpOptions).subscribe(r=>{})
}
newComment(article,author,comment,token) {

  let date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*'
    })
  };
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/comments", { author: author,comment: comment, article: article, date: date},httpOptions).subscribe(r=>{})
}

deleteArticle(id,token) {
  
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Headers': '*'
    }),
    
    
  }
  return this.http.post("https://peaceful-mountain-88307.herokuapp.com/deletearticles",{id:id}, httpOptions).subscribe(r=>{})
}
sendContact(name,email,message) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': '*'

    })
  };
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/sendcontact", { name: name,email: email, message: message },httpOptions).subscribe(r=>{})
}
}
  