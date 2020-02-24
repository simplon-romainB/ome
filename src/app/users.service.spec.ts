
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { UsersService } from './users.service';




describe('UsersService', () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;
  const headers = new Headers();
  const token = 'secretToken';
  const header = 'authorization';
  const headerValue = `Bearer ${token}`;
  headers.append(header, headerValue);
  const dummyCredentials = { email: 'test@test.com', password: 'password' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    injector = getTestBed();
    service = injector.get(UsersService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should return articles', () => {
    const dummyArticles: object = [
      { title: 'article1', body: 'articlebody1', id: 1, image: 'articleimage1' },
      { title: 'article2', body: 'articlebody2', id: 2, image: 'articleimage2' }
    ];
    service.initArticles().subscribe(articles => {
      expect(articles).toEqual(dummyArticles);
    });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/articles');
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticles);
  });

  it('should return comments', () => {
    const dummyComments: object = [
      { articles: 1, author: 'author1', body: 'commentBody1', id: 1 },
      { articles: 1, author: 'author1', body: 'commentBody1', id: 1 }
    ];
    service.initComments().subscribe(comments => {
      expect(comments).toEqual(dummyComments);
    });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/comments');
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should register email/password', () => {
    service.register(dummyCredentials.email, dummyCredentials.password).subscribe((v) => { });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/db');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyCredentials);
    req.flush(dummyCredentials);
  });

  it('should login email/password', () => {
    service.login(dummyCredentials.email, dummyCredentials.password).subscribe((v) => { });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyCredentials);
    req.flush(dummyCredentials);
  });

  it('should post new article', () => {
    const currentDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    const dummyArticle = {
      titre: 'articleTitre', article: 'articleBody', date: currentDate, categorie: 'articleCategorie', image: 'articleImage'
    };
    service.newArticle(dummyArticle.titre, dummyArticle.article, token, dummyArticle.categorie, dummyArticle.image)
      .subscribe((v) => { });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/postarticles');
    expect(req.request.headers.get(header)).toEqual(headerValue);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.date).toEqual(currentDate);
    req.flush(dummyArticle);
  });

  it('should update article', () => {
    const dummyArticle = {
      titre: 'articleTitre', article: 'articleBody', id: 1
    };
    service.updateArticle(dummyArticle.titre, dummyArticle.article, token, dummyArticle.id)
      .subscribe((v) => { });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/updatearticles');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyArticle);
    expect(req.request.headers.get(header)).toEqual(headerValue);
    req.flush(dummyArticle);
  });

  it('should post new comment', () => {
    const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    const dummyComment = { author: 'author1', comment: 'commentaire', article: 'articleName', date };
    service.newComment(dummyComment.article, dummyComment.author, dummyComment.comment, token)
      .subscribe((v) => { });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/comments');
    expect(req.request.headers.get(header)).toEqual(headerValue);
    expect(req.request.body).toEqual(dummyComment);
    expect(req.request.method).toBe('POST');
    req.flush(dummyComment);
  });

  it('should delete article', () => {
    const dummyId = 1;
    service.deleteArticle(dummyId, token)
      .subscribe((v) => { });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/deletearticles');
    expect(req.request.headers.get(header)).toEqual(headerValue);
    expect(req.request.body.id).toEqual(dummyId);
    expect(req.request.method).toBe('POST');
    req.flush(dummyId);
  });

  it('should post contact infos', () => {
    const dummyContact = { name: 'myName', email: 'email', message: 'myMessage' };
    service.sendContact(dummyContact.name, dummyContact.email, dummyContact.message)
      .subscribe((v) => { });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/sendcontact');
    expect(req.request.body).toEqual(dummyContact);
    expect(req.request.method).toBe('POST');
    req.flush(dummyContact);
  });




  afterEach(() => {
    httpMock.verify();
  });
});


