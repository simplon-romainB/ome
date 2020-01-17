import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule,HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImagesdownloadService {

  constructor(private http: HttpClient) {}

  downloadFile():Observable<Blob>{		
		return this.http.get('http://localhost:8080/employees/download', { responseType: "blob" });
   }
   
}

