import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  private email: String
  private password: String
  ngOnInit() {
  }
myFunc(email,password) {
  this.usersService.register(email,password)
  console.log("ok")
}
}
