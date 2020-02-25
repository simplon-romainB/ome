import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as _ from 'lodash';
import { of } from 'rxjs';

import { BlogComponent } from './blog.component';
import { UsersService } from '../users.service';
import { KeepconnectionService } from '../keepconnection.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../article.model';
import { Comment } from '../comment.model';





describe('BlogComponent', () => {
    let http: HttpClient;
    let spy: any;
    let keepconnectionService: KeepconnectionService;
    const usersService: UsersService = new UsersService(http);
    let modalService: NgbModal;
    const blogComponent = new BlogComponent(keepconnectionService, usersService, modalService);
    let articles: Article[];
    let comments: Comment[];

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [BlogComponent],
          providers: [UsersService, KeepconnectionService, NgbModal],
          schemas: [NO_ERRORS_SCHEMA]
        });
    });
    it('should initialize articles and comments', () => {
        const dummyArticles: object = [{id: 1,
                                  articlesName: 'name',
                                  articlesBody: 'article',
                                  articlesDate: 'date',
                                  articlesId: 1,
                                  articlesCategorie: 'categorie',
                                  articlesImage: 'image'},
                                 {id: 2,
                                  articlesName: 'name',
                                  articlesBody: 'article',
                                  articlesDate: 'date',
                                  articlesId: 1,
                                  articlesCategorie: 'categorie',
                                  articlesImage: 'image'}];
        const articlesResults: object = [{articles_name: 'name',
                                         articles_body: 'article',
                                         articles_date: 'date',
                                         articles_id: 1,
                                         articles_categorie: 'categorie',
                                         articles_image: 'image'},
                                        {articles_name: 'name',
                                         articles_body: 'article',
                                         articles_date: 'date',
                                         articles_id: 1,
                                         articles_categorie: 'categorie',
                                         articles_image: 'image'}];
        const dummyComments: object = {name: 'name', comment: 'comment'};
        usersService.initArticles = jasmine.createSpy().and.returnValue(of(articlesResults));
        usersService.initComments = jasmine.createSpy().and.returnValue(of(dummyComments));
        const results = blogComponent.Init();
        expect(JSON.stringify(results)).toEqual(JSON.stringify([dummyArticles, dummyComments]));
    });
    it('should return pageOfItems', () => {
        const dummyPageOfItems: Array<any> = [{items: 'items'}];
        expect(blogComponent.onChangePage(dummyPageOfItems)).toEqual(dummyPageOfItems);
    });
});