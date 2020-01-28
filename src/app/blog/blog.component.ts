import { Component, OnInit, NgZone } from '@angular/core';
import { UsersService } from '../users.service';
import {KeepconnectionService} from '../keepconnection.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router,NavigationStart, ActivatedRoute} from '@angular/router'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-blog ',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {

  constructor(private keepconnectionService: KeepconnectionService, private usersService: UsersService, private modalService: NgbModal, private router: Router, private ngZone: NgZone, private activeRoute: ActivatedRoute) { }
  private articlesValue;
  private closeResult: string;
  private email: String
  private password: String
  private authToken: String
  private authRole: String = null;
  private titre: String;
  private article:String ;
  private author:String
  private comment:String
  private articleTitle:String
  private commentsValue:Object
  private items: Array<any>
  private pageOfItems: Array<any>;
  private activatedAccount:String
  private errorMessage:String
  private alert:Boolean
  private itemsFilter: any[];
  private idCurrent: Number
  private articleEdit: String
  private titleEdit: String
  private model: any
  private image: String

  public Editor = ClassicEditor;
  ngOnInit() {

    this.Init()
    
}


  Init() {
    var displayArticles = this.usersService.initArticles().subscribe(v=> {this.articlesValue = v 
      this.commentsValue = v
      this.items = Array(this.articlesValue.length).fill(0).map((x, i) =>({ id: (i + 1), articles_name: v[i].articles_name, articles_body: v[i].articles_body, articles_date: v[i].articles_date, articles_id: v[i].articles_id, articles_categorie: v[i].articles_categorie, articles_image: v[i].articles_image}));
      this.itemsFilter = this.items
    });
      var s = this.usersService.initComments().subscribe(v=> this.commentsValue = v)
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  openUpdate(updatecontent) {
    this.modalService.open(updatecontent, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  defineArticle(article: String) {
    this.articleTitle = article
  }
  defineArticleUpdate(name: String,body: String,id: Number) {
    this.idCurrent = id
    this.articleEdit = body
    this.titleEdit = name

  }

  openComment(newContent) {
    this.modalService.open(newContent, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  
  }

  confirmDelete(deletecontent,id: Number) {
    this.idCurrent = id
    this.modalService.open(deletecontent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  deleteArticle(id: Number,token: String) {
    this.usersService.deleteArticle(id,token)
    var s = this.usersService.deleteArticle(id,token).subscribe(v =>
      this.Init())
    
  }
disconnect() {
  this.keepconnectionService.connexion = 0
  this.keepconnectionService.authToken = null;
  this.keepconnectionService.authRole = null;
  this.keepconnectionService.activatedAccount = null;
}

myFunc(email: String,password: String) {
  this.usersService.login(email,password)
  var s = this.usersService.login(email,password).subscribe(v =>
     {
      
      if (v!=null&&v!='wrong password') {
        this.keepconnectionService.connexion = 3
        this.keepconnectionService.authToken = v[0];
        this.keepconnectionService.authRole = v[1];
        this.keepconnectionService.activatedAccount = v[2];
        this.errorMessage = null;
        this.alert = false;
        
      }
      else if (v=='wrong password') {
        this.alert = true;
        this.errorMessage = 'wrong password'
      }

      else if(v==null) {
        this.alert = true;
        this.errorMessage = 'wrong email'
      }
  });
}

articleFilter(categorie: String) {
  
 this.items=  this.itemsFilter.filter(v => v.articles_categorie.toString() == categorie)
 
}
register(email: String,password:String) {
  this.usersService.register(email,password)
  this.keepconnectionService.connexion = 0
  alert("un email de confirmation a été envoyé a" + this.keepconnectionService.email + " veuillez clicker sur le lien fourni pour activer votre compte")
  }
loginShow() {
  this.keepconnectionService.connexion = 1
}
registerShow() {
  this.keepconnectionService.connexion = 2
}
newArticle(titre: String,article: String,authToken: String,categorie: String,image: String) {
  this.usersService.newArticle(titre,article,authToken,categorie,image)
  var s = this.usersService.newArticle(titre,article,authToken,categorie,image).subscribe(v => this.Init())
}
newComment(article: String,author: String,comment: String,token: String) {
  
  this.usersService.newComment(article,author,comment,token)
}
updateArticle(title: String,body: String,token: String, id: Number) {
  this.usersService.updateArticle(title,body,token, id)
  var s = this.usersService.updateArticle(title,body, token, id).subscribe(v =>
    this.Init())
}
}
