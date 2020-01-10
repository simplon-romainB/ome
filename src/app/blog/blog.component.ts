import { Component, OnInit, NgZone } from '@angular/core';
import { UsersService } from '../users.service';
import {KeepconnectionService} from '../keepconnection.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router,NavigationStart, ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-blog ',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {

  constructor(private keepconnectionService: KeepconnectionService, private usersService: UsersService, private modalService: NgbModal, private router: Router, private ngZone: NgZone, private activeRoute: ActivatedRoute) { }
  private articlesValue;
  closeResult: string;
  private email: String
  private password: String
  private authToken
  private authRole = null;
  private titre;
  private article;
  private author;
  private comment;
  private articleTitle;
  private commentsValue;
  private items = [];
  private pageOfItems: Array<any>;
  private activatedAccount;
  private errorMessage;
  private alert;
  private itemsFilter: any[];
  private idCurrent 
  private articleEdit 
  private titleEdit 
  ngOnInit() {
    var displayArticles = this.usersService.initArticles().subscribe(v=> this.articlesValue = v) ;
    var t = this.usersService.initComments().subscribe(v=> this.commentsValue = v)
    var l = this.usersService.initArticles().subscribe(v => this.items = Array(this.articlesValue.length).fill(0).map((x, i) =>({ id: (i + 1), articles_name: v[i].articles_name, articles_body: v[i].articles_body, articles_date: v[i].articles_date, articles_id: v[i].articles_id, articles_categorie: v[i].articles_categorie, articles_image: v[i].articles_image})));
    var j = this.usersService.initComments().subscribe(v=> this.itemsFilter = this.items);
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
  defineArticle(article) {
    this.articleTitle = article
  }
  defineArticleUpdate(name,body,id) {
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

  confirmDelete(deletecontent,id) {
    this.idCurrent = id
    this.modalService.open(deletecontent, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  deleteArticle(id,token) {
    this.usersService.deleteArticle(id,token)
  }
disconnect() {
  this.keepconnectionService.connexion = 0
  this.keepconnectionService.authToken = null;
  this.keepconnectionService.authRole = null;
  this.keepconnectionService.activatedAccount = null;
}

myFunc(email,password) {
  this.usersService.login(email,password)
  var s = this.usersService.login(email,password).subscribe(v =>
     {
      console.log(v);
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

articleFilter(categorie) {
  
 this.items=  this.itemsFilter.filter(v => v.articles_categorie.toString() == categorie)
 
}
register(email,password) {
  this.usersService.register(email,password)
  }
loginShow() {
  this.keepconnectionService.connexion = 1
}
registerShow() {
  this.keepconnectionService.connexion = 2
}
newArticle(titre,article,authToken) {
  this.usersService.newArticle(titre,article,authToken)
  
}
newComment(article,author,comment,token) {
  
  this.usersService.newComment(article,author,comment,token)
}
updateArticle(title,body,token, id) {
  this.usersService.updateArticle(title,body,token, id)
}
}
