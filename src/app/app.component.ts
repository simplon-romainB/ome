import { Component,OnInit } from '@angular/core';
import { slideInAnimation } from './route-animations';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { ImagesdownloadService} from './imagesdownload.service';
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  constructor(private router: Router, private imagesdownloadService: ImagesdownloadService) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  //download() {
    //this.imagesdownloadService.downloadFile().subscribe(response => {
		//	let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			//const url= window.URL.createObjectURL(blob);
			//window.open(url);
			//fileSaver.saveAs(blob, 'employees.json');
	//	}), error => console.log('Error downloading the file'),
               //  () => console.info('File downloaded successfully');
  //}
  
}

 

