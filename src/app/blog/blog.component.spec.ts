import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as _ from 'lodash';
import { of } from 'rxjs';

import { BlogComponent } from './blog.component';
import { UsersService } from '../users.service';
import { KeepconnectionService } from '../keepconnection.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../article.model';
import { Comment } from '../comment.model';
import { FormsModule } from '@angular/forms';


export class MockNgbModalRef {
    result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
  }


describe('BlogComponent', () => {
    let fixture: ComponentFixture<BlogComponent>;
    let blogComponent: BlogComponent;
    let usersService: UsersService;
    let modalService: NgbModal;
    let keepconnectionService: KeepconnectionService;
    let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

    beforeEach(async() => {
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
});
