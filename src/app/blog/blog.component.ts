import { Component, OnInit, NgZone } from '@angular/core';
import { UsersService } from '../users.service';
import { KeepconnectionService } from '../keepconnection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-blog ',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {

  constructor(private keepconnectionService: KeepconnectionService, private usersService: UsersService, private modalService: NgbModal, private router: Router, private activeRoute: ActivatedRoute) { }
  private articlesValue;
  private closeResult: string;
  private email: string;
  private password: string;
  private authToken: string;
  private authRole: string = null;
  private titre: string;
  private article: string;
  private author: string;
  private comment: string;
  private articleTitle: string;
  private commentsValue: Object;
  private items: Array<any>;
  private pageOfItems: Array<any>;
  private activatedAccount: string;
  private errorMessage: string;
  private alert: boolean;
  private itemsFilter: any[];
  private idCurrent: number;
  private articleEdit: string;
  private titleEdit: String;
  private model: any;
  private image: string;

  public Editor = ClassicEditor;
  ngOnInit() {

    this.Init()  
}


  Init() {
    const displayArticles = this.usersService.initArticles().subscribe(v=> {this.articlesValue = v;
                                                                            this.commentsValue = v;
                                                                            this.items = Array(this.articlesValue.length).fill(0).map((x, i) =>({ id: (i + 1), articles_name: v[i].articles_name,
                                                                                                                                                               articles_body: v[i].articles_body,
                                                                                                                                                               articles_date: v[i].articles_date,
                                                                                                                                                               articles_id: v[i].articles_id,
                                                                                                                                                               articles_categorie: v[i].articles_categorie,
                                                                                                                                                               articles_image: v[i].articles_image
                                                                                                                                                              }));
      this.itemsFilter = this.items;      
    });
      const s = this.usersService.initComments().subscribe(v=> this.commentsValue = v);
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
  defineArticle(article: string) {
    this.articleTitle = article;
  }
  defineArticleUpdate(name: string,body: string,id: number) {
    this.idCurrent = id;
    this.articleEdit = body;
    this.titleEdit = name;

  }

  openComment(newContent) {
    this.modalService.open(newContent, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  
  }

  confirmDelete(deletecontent,id: number) {
    this.idCurrent = id
    this.modalService.open(deletecontent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  deleteArticle(id: Number,token: string) {
    this.usersService.deleteArticle(id,token);
    const s = this.usersService.deleteArticle(id,token).subscribe(v =>
      this.Init())
    
  }
disconnect() {
  this.keepconnectionService.connexion = 0;
  this.keepconnectionService.authToken = null;
  this.keepconnectionService.authRole = null;
  this.keepconnectionService.activatedAccount = null;
}

myFunc(email: string,password: string) {
  this.usersService.login(email,password);
  const s = this.usersService.login(email,password).subscribe(v =>
     {
      
      if (v!== null && v!== 'wrong password') {
        this.keepconnectionService.connexion = 3;
        this.keepconnectionService.authToken = v[0];
        this.keepconnectionService.authRole = v[1];
        this.keepconnectionService.activatedAccount = v[2];
        this.errorMessage = null;
        this.alert = false; 
      }
      else if (v=== 'wrong password') {
        this.alert = true;
        this.errorMessage = 'wrong password';
      }
      else if(v==null) {
        this.alert = true;
        this.errorMessage = 'wrong email';
      }
  });
}

articleFilter(categorie: string) {
  
 this.items = this.itemsFilter.filter(v => v.articles_categorie.toString() === categorie); 
}
register(email: string, password:string) {
  this.usersService.register(email,password);
  this.keepconnectionService.connexion = 0;
  alert('un email de confirmation a été envoyé a' + this.keepconnectionService.email + ' veuillez clicker sur le lien fourni pour activer votre compte');
  }
loginShow() {
  this.keepconnectionService.connexion = 1;
}
registerShow() {
  this.keepconnectionService.connexion = 2;
}
newArticle(titre: string,article: string, authToken: string, categorie: string, image: string) {
  this.usersService.newArticle(titre,article,authToken,categorie,image);
  const s = this.usersService.newArticle(titre, article, authToken, categorie, image).subscribe(v => this.Init());
}
newComment(article: string, author: string, comment: string, token: string) {
  this.usersService.newComment(article,author,comment,token);
}
updateArticle(title: string, body: string, token: string, id: number) {
  this.usersService.updateArticle(title,body,token, id);
  const s = this.usersService.updateArticle(title,body, token, id).subscribe(v =>
    this.Init());
}
}
