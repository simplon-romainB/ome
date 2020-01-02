import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {

  constructor(private usersService: UsersService, private modalService: NgbModal) { }
  private articlesValue;
  closeResult: string;
  private email: String
  private password: String
  private connexion = 0
  private authToken
  private authRole = null;
  private titre;
  private article;
  private author;
  private comment;
  private articleTitle;
  private commentsValue;
  private passwordpattern = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/"
  ngOnInit() {
    var displayArticles = this.usersService.initArticles().subscribe(v=> this.articlesValue = v) ;
    var s = this.usersService.initArticles().subscribe(v=> console.log(v))  
    var t = this.usersService.initComments().subscribe(v=> this.commentsValue = v)
    var u = this.usersService.initComments().subscribe(v=> console.log(v)) 
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  defineArticle(article) {
    this.articleTitle = article
  }

  openComment(newContent) {
    this.modalService.open(newContent, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  
  }
 

myFunc(email,password) {
  this.usersService.login(email,password)
  var s = this.usersService.login(email,password).subscribe(v=> this.authToken = v[0]);
  var r = this.usersService.login(email,password).subscribe(v=> this.authRole = v[1]);
  var t = this.usersService.login(email, password).subscribe(v =>console.log(v));
  this.connexion = 3
  
  }
register(email,password) {
  this.usersService.register(email,password)
  }
loginShow() {
  this.connexion = 1
}
registerShow() {
  this.connexion = 2
}
newArticle(titre,article,authToken) {
  this.usersService.newArticle(titre,article,authToken)
  var s = this.usersService.newArticle(titre,article,authToken).subscribe(v => console.log(v));
}
newComment(article,author,comment,token) {
  console.log("nom article" + article)
  this.usersService.newComment(article,author,comment,token)
  var s = this.usersService.newComment(article,author,comment,token).subscribe(v => console.log(v));
}
}
