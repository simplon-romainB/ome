import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ApplicationModule } from '@angular/core';
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
    let blogComponent: BlogComponent;
    let usersService: UsersService;
    let fixture: ComponentFixture<BlogComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
          imports: [ApplicationModule],
          declarations: [BlogComponent],
          providers: [UsersService, KeepconnectionService, NgbModal, Article, Comment],
          schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents()
        .then(() => {
             fixture = TestBed.createComponent(BlogComponent);
             blogComponent = fixture.componentInstance;
             usersService = TestBed.get(UsersService);
             console.log(blogComponent);
           });

        //fixture = TestBed.createComponent(BlogComponent);
       // blogComponent = fixture.componentInstance;
        //usersService = TestBed.get(UsersService);
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

    it('should change page', () => {
        const dummyPageOfItems: Array<any> = [{items: 'items'}];
        expect(blogComponent.onChangePage(dummyPageOfItems)).toEqual(dummyPageOfItems);
    });
});

