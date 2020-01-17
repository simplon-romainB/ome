import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.styl']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  images = ["/assets/gameoflife.png", "/assets/planete-mars.jpg", "/assets/raw.jfif","/assets/asteroids.jpg"]
}
