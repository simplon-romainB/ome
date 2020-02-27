import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as _ from 'lodash';
import { of, Observable } from 'rxjs';

import { BlogComponent } from './blog.component';
import { UsersService } from '../users.service';
import { KeepconnectionService } from '../keepconnection.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../article.model';
import { Comment } from '../comment.model';
import { FormsModule } from '@angular/forms';



describe('BlogComponent', () => {
    let fixture: ComponentFixture<BlogComponent>;
    let blogComponent: BlogComponent;
    let usersService: UsersService;
    let modalService: NgbModal;
    let keepconnectionService: KeepconnectionService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, NgbModule],
            declarations: [BlogComponent],
            providers: [UsersService, KeepconnectionService, NgbModal],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(BlogComponent);
        blogComponent = fixture.componentInstance;
        usersService = TestBed.get(UsersService);
        modalService = TestBed.get(NgbModal);
        keepconnectionService = TestBed.get(KeepconnectionService);
        fixture.detectChanges();
    });
    it('should initialize articles and comments', () => {
        const dummyArticles: object = [{
            id: 1,
            articlesName: 'name',
            articlesBody: 'article',
            articlesDate: 'date',
            articlesId: 1,
            articlesCategorie: 'categorie',
            articlesImage: 'image'
        },
        {
            id: 2,
            articlesName: 'name',
            articlesBody: 'article',
            articlesDate: 'date',
            articlesId: 1,
            articlesCategorie: 'categorie',
            articlesImage: 'image'
        }];
        const articlesResults: object = [{
            articles_name: 'name',
            articles_body: 'article',
            articles_date: 'date',
            articles_id: 1,
            articles_categorie: 'categorie',
            articles_image: 'image'
        },
        {
            articles_name: 'name',
            articles_body: 'article',
            articles_date: 'date',
            articles_id: 1,
            articles_categorie: 'categorie',
            articles_image: 'image'
        }];
        const dummyComments: object = { name: 'name', comment: 'comment' };
        usersService.initArticles = jasmine.createSpy().and.returnValue(of(articlesResults));
        usersService.initComments = jasmine.createSpy().and.returnValue(of(dummyComments));
        const results = blogComponent.Init();
        expect(JSON.stringify(results)).toEqual(JSON.stringify([dummyArticles, dummyComments]));
    });
    it('should return pageOfItems', () => {
        const dummyPageOfItems: Array<any> = [{ items: 'items' }];
        expect(blogComponent.onChangePage(dummyPageOfItems)).toEqual(dummyPageOfItems);
    });
    it('should open new articles modal', () => {
        spyOn(modalService, 'open');
        blogComponent.open('content');
        expect(modalService.open).toHaveBeenCalledWith('content', { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    });
    it('should open update articles modal', () => {
        spyOn(modalService, 'open');
        blogComponent.openUpdate('updatecontent');
        expect(modalService.open).toHaveBeenCalledWith('updatecontent', { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    });
    it('should open new comment modal', () => {
        const dummyTitle = 'dummyTitle';
        spyOn(modalService, 'open');
        blogComponent.openComment('newcontent', dummyTitle);
        expect(modalService.open).toHaveBeenCalledWith('newcontent', { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
        expect(blogComponent.articleTitle).toEqual(dummyTitle);
    });
    it('should open confirm delete modal', () => {
        const dummyId = 1;
        spyOn(modalService, 'open');
        blogComponent.confirmDelete('deletecontent', dummyId);
        expect(modalService.open).toHaveBeenCalledWith('deletecontent', { ariaLabelledBy: 'modal-basic-title', size: 'sm' });
        expect(blogComponent.idCurrent).toEqual(dummyId);
    });
    it('should define an article to update', () => {
        const articleUpdate = blogComponent.defineArticleUpdate('title', 'body', 1);
        expect(articleUpdate).toEqual([1, 'body', 'title']);
    });
    it('should delete an article', () => {
        spyOn(usersService, 'deleteArticle').and.callFake((id: number, token: string) => {
            const retour: Observable<object> = Observable.create((observer) => {
                observer.next('Hello');
                observer.next('World');
                observer.complete();
            });
            return retour;
        });
        spyOn(blogComponent, 'Init')
        const retour = blogComponent.deleteArticle(1, 'token');
        expect(usersService.deleteArticle).toHaveBeenCalledWith(1, 'token');
        expect(blogComponent.Init).toHaveBeenCalled();
    });
    it('should reset connectionServices variables', () => {
        const dummyConnectionService = { connexion: 0, authToken: null, authRole: null, activatedAccount: null};
        const disconnection = blogComponent.disconnect();
        expect(disconnection.connexion).toEqual(dummyConnectionService.connexion);
        expect(disconnection.authToken).toEqual(dummyConnectionService.authToken);
        expect(disconnection.authRole).toEqual(dummyConnectionService.authRole);
        expect(disconnection.activatedAccount).toEqual(dummyConnectionService.activatedAccount);
    });
    it('should call usersService login', () => {
        spyOn(usersService, 'login').and.callThrough();
        blogComponent.login('email', 'password');
        expect(usersService.login).toHaveBeenCalled();
    });
    it('should display login infos(success)', () => {
        spyOn(usersService, 'login').and.callFake((email: string, password: string) => {
            const retour: Observable<object> = Observable.create((observer) => {
                observer.next(['secretToken', 'role', 'true']);
                observer.complete();
            });
            return retour;
        });
        blogComponent.login('email', 'password');
        expect(keepconnectionService.authToken).toEqual('secretToken');
        expect(keepconnectionService.authRole).toEqual('role');
        expect(keepconnectionService.activatedAccount).toEqual('true');
        expect(blogComponent.errorMessage).toEqual(null);
        expect(blogComponent.alert).toBe(false);
        expect(keepconnectionService.connexion).toEqual(3);
    });
    it('should display password error(wrong password)', () => {
        spyOn(usersService, 'login').and.callFake((email: string, password: string) => {
            const retour: Observable<object> = Observable.create((observer) => {
                observer.next('wrong password');
                observer.complete();
            });
            return retour;
        });
        blogComponent.login('email', 'password');
        expect(blogComponent.errorMessage).toEqual('wrong password');
        expect(blogComponent.alert).toEqual(true);
    });
    it('should display email error(wrong email)', () => {
        spyOn(usersService, 'login').and.callFake((email: string, password: string) => {
            const retour: Observable<object> = Observable.create((observer) => {
                observer.next(null);
                observer.complete();
            });
            return retour;
        });
        blogComponent.login('email', 'password');
        expect(blogComponent.errorMessage).toEqual('wrong email');
        expect(blogComponent.alert).toEqual(true);

    });
    it('should display filter articles', () => {
        blogComponent.itemsFilter = [{title: 'title', articlesCategorie: 'tech'}, {title: 'title2', articlesCategorie: 'nouvelles'}];
        const dummyItems = [{title: 'title2', articlesCategorie: 'nouvelles'}];
        blogComponent.articleFilter('nouvelles');
        expect(blogComponent.items).toEqual(dummyItems);

    });
    it('should call usersService register', () => {
        keepconnectionService.email = 'email'; // define by a NgModal in template
        spyOn(usersService, 'register').and.callThrough();
        blogComponent.register('email', 'password');
        expect(usersService.register).toHaveBeenCalled();
        expect(keepconnectionService.connexion).toEqual(0);
        expect(keepconnectionService.email).toEqual('email');
    });
    it('should create an article', () => {
        spyOn(usersService, 'newArticle').and.callFake((titre: 'titre',
                                                        article: 'article',
                                                        token: 'serectToken',
                                                        categorie: 'categorie',
                                                        image: 'image') => {
            const retour: Observable<object> = Observable.create((observer) => {
                observer.next('fake');
                observer.complete();
            });
            return retour;
        });
        spyOn(blogComponent, 'Init');
        blogComponent.newArticle('titre', 'article', 'secertToken', 'categorie', 'image');
        expect(usersService.newArticle).toHaveBeenCalledWith('titre', 'article', 'secertToken', 'categorie', 'image');
        expect(blogComponent.Init).toHaveBeenCalled();
    });
});
