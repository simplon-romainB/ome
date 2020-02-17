
import { TestBed, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http'

import { UsersService } from './users.service';




describe('UsersService', () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {TestBed.configureTestingModule({
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
      { articles: 1, author: 'author1', body: 'commentBody1', id: 1  },
      { articles: 1, author: 'author1', body: 'commentBody1', id: 1  }
    ];
    service.initComments().subscribe(comments => {
      expect (comments).toEqual(dummyComments);
    });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/comments');
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should post userName/password', () => {
    const dummyCredentials = { email: 'test@test.com', password: 'password'};
    service.register(dummyCredentials.email, dummyCredentials.password).subscribe((v) => {});
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/db');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyCredentials);
    req.flush(dummyCredentials);
  });

  afterEach(() => {
    httpMock.verify();
  });
});


