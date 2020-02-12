
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
    const dummyArticles = [
      { title: 'article1', body: 'articlebody1', id: 1, image: 'articleimage1' },
      { title: 'article2', body: 'articlebody2', id: 2, image: 'articleimage2' }
    ];
    service.initArticles().subscribe(articles => {
      expect(Object.keys(articles).length).toBe(2);
      expect(JSON.stringify(articles)).toEqual(JSON.stringify(dummyArticles));
    });
    const req = httpMock.expectOne('https://peaceful-mountain-88307.herokuapp.com/articles');
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticles);
  });

  it('should return comments', () => {
    const dummyComments = [
      { author}
    ]
  });

  afterEach(() => {
    httpMock.verify();
  });
});


