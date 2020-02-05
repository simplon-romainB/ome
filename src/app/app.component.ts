import { Component } from '@angular/core';
import { slideInAnimation } from './route-animations';
import { Router, RouterOutlet } from '@angular/router';
import { ImagesdownloadService} from './imagesdownload.service';


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
}

 

