import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { KeepconnectionService } from '../keepconnection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../article.model';
import { Comment } from '../comment.model';


import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-blog ',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {
  private articles: Article[];
  private comments: Comment[];

  constructor(private keepconnectionService: KeepconnectionService,
    private usersService: UsersService,
    private modalService: NgbModal,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private article: Article
  ) {
    this.articles = new Array<Article>();
    this.comments = new Array<Comment>();
  }
  private articleTitle: string;
  private articlesValue;
  private closeResult: string;
  private email: string;
  private password: string;
  private authToken: string;
  private authRole: string;
  private comment: string;
  private items: Array<any>;
  private pageOfItems: Array<any>;
  private activatedAccount: string;
  private errorMessage: string;
  private alert: boolean;
  private itemsFilter: any[];
  private idCurrent: number;
  private articleEdit: string;
  private titleEdit: string;
  private model: any;

  public Editor = ClassicEditor;
  ngOnInit() {

    this.Init();
  }


  Init() {
    const displayArticles = this.usersService.initArticles().subscribe(results => {
      const resultString = JSON.stringify(results); //
      this.articles = JSON.parse(resultString);
      this.items = Array(this.articles.length).fill(0).map((x, i) => (
        {
          id: (i + 1), articlesName: this.articles[i].articles_name,
          articlesBody: this.articles[i].articles_body,
          articlesDate: this.articles[i].articles_date,
          articlesId: this.articles[i].articles_id,
          articlesCategorie: this.articles[i].articles_categorie,
          articlesImage: this.articles[i].articles_image
        }));
      this.itemsFilter = this.items;
    });
    const displayComments = this.usersService.initComments().subscribe(results => {
      const resultString = JSON.stringify(results);
      this.comments = JSON.parse(resultString);
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }
  openUpdate(updatecontent) {
    this.modalService.open(updatecontent, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }

  openComment(newContent, title) {
    this.articleTitle = title;
    this.modalService.open(newContent, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }

  confirmDelete(deletecontent, id: number) {
    this.idCurrent = id;
    this.modalService.open(deletecontent, { ariaLabelledBy: 'modal-basic-title', size: 'sm' });
  }

  defineArticleUpdate(name: string, body: string, id: number) {
    this.idCurrent = id;
    this.articleEdit = body;
    this.titleEdit = name;
  }

  deleteArticle(id: number, token: string) {
    this.usersService.deleteArticle(id, token);
    const s = this.usersService.deleteArticle(id, token).subscribe(v =>
      this.Init());
  }
  disconnect() {
    this.keepconnectionService.connexion = 0;
    this.keepconnectionService.authToken = null;
    this.keepconnectionService.authRole = null;
    this.keepconnectionService.activatedAccount = null;
  }

  login(email: string, password: string) {
    this.usersService.login(email, password);
    const s = this.usersService.login(email, password).subscribe(result => {
      if (result !== null && result !== 'wrong password') {
        this.keepconnectionService.connexion = 3;
        this.keepconnectionService.authToken = result[0];
        this.keepconnectionService.authRole = result[1];
        this.keepconnectionService.activatedAccount = result[2];
        this.errorMessage = null;
        this.alert = false;
      } else if (result === 'wrong password') {
        this.alert = true;
        this.errorMessage = 'wrong password';
      } else if (result === null) {
        this.alert = true;
        this.errorMessage = 'wrong email';
      }
    });
  }

  articleFilter(categorie: string) {
    this.items = this.itemsFilter.filter(v => v.articlesCategorie.toString() === categorie);
  }
  register(email: string, password: string) {
    this.usersService.register(email, password);
    this.keepconnectionService.connexion = 0;
    alert('un email de confirmation a été envoyé a' +
      this.keepconnectionService.email +
      ' veuillez clicker sur le lien fourni pour activer votre compte');
  }
  loginShow() {
    this.keepconnectionService.connexion = 1;
  }
  registerShow() {
    this.keepconnectionService.connexion = 2;
  }
  newArticle(titre: string, article: string, authToken: string, categorie: string, image: string) {
    this.usersService.newArticle(titre, article, authToken, categorie, image);
    const s = this.usersService.newArticle(titre, article, authToken, categorie, image).subscribe(v => this.Init());
  }
  newComment(article: string, author: string, comment: string, token: string) {
    this.usersService.newComment(article, author, comment, token).subscribe(v => this.Init());
  }
  updateArticle(title: string, body: string, token: string, id: number) {
    this.usersService.updateArticle(title, body, token, id);
    const s = this.usersService.updateArticle(title, body, token, id).subscribe(v =>
      this.Init());
  }
}
