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
  images = ["http://127.0.0.1:8887/photoperso.jpg", "http://127.0.0.1:8887/ecran.jpg", "http://127.0.0.1:8887/2.png"]
}
