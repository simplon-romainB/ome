import { Component,OnInit } from '@angular/core';
import { slideInAnimation } from './route-animations';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  constructor(private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

 ngOnInit() {
 }
}
