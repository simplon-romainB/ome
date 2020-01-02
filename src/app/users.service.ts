import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
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
      'Access-Control-Allow-Origin':'*',
      'mon-entete-personnalise':'maValeur'
    })
  };
this.http.post("https://peaceful-mountain-88307.herokuapp.com/db", { email: email, password: password}).subscribe(() => {
  console.log('Enregistrement terminé !');
  },
(error) => {
  console.log('Erreur ! : ' + error);
  });
}

login(email,password) {
  const optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'mon-entete-personnalise':'maValeur'
    })
  };
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/login", { email: email, password: password})

    }
initArticles() {


  {return this.http.get("https://peaceful-mountain-88307.herokuapp.com/articles");
  
  }
}
initComments() {
  
  {return this.http.get("https://peaceful-mountain-88307.herokuapp.com/comments");
  
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
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/postarticles", { titre: titre, article: article, date: date},httpOptions)

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
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/comments", { author: author,comment: comment, article: article, date: date},httpOptions)
}
sendContact(name,email,message) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': '*'
    })
  };
    return this.http.post("https://peaceful-mountain-88307.herokuapp.com/sendcontact", { name: name,email: email, message: message },httpOptions)
}
}
  